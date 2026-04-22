import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ScriptRequest {
  topic: string;
  niche?: string;
  tone?: string;
  duration?: string;
  hookStyle?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, niche, tone, duration, hookStyle } = (await req.json()) as ScriptRequest;

    if (!topic || topic.trim().length < 3) {
      return new Response(JSON.stringify({ error: "Tell us what your reel is about (at least a few words)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are ReelKit's senior short-form scriptwriter. You write viral-ready Reels / TikTok / Shorts scripts in a Gen-Z voice — punchy, conversational, no corporate fluff.

Output MUST be valid JSON matching this exact shape (use the tool):
- title: catchy reel title (max 60 chars)
- hook: a scroll-stopping first 3 seconds (one or two sentences, must create curiosity / pattern interrupt)
- script: array of 4-6 beats. Each beat has { timestamp: "0-3s", visual: "what the viewer sees", voiceover: "what the creator says" }
- caption: Instagram caption with 1-2 short lines + 5-8 relevant hashtags
- cta: a single clear call-to-action line
- bRollIdeas: array of 3-5 short B-roll suggestions

Rules: Keep total spoken duration close to the requested seconds. Plain language. No emojis in voiceover unless the tone calls for it. Hashtags lowercase.`;

    const userPrompt = `Topic: ${topic}
Niche: ${niche || "general creator"}
Tone: ${tone || "energetic + relatable"}
Target duration: ${duration || "30 seconds"}
Hook style: ${hookStyle || "curiosity gap"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "deliver_reel_script",
              description: "Return the structured Reel script.",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  hook: { type: "string" },
                  script: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        timestamp: { type: "string" },
                        visual: { type: "string" },
                        voiceover: { type: "string" },
                      },
                      required: ["timestamp", "visual", "voiceover"],
                      additionalProperties: false,
                    },
                  },
                  caption: { type: "string" },
                  cta: { type: "string" },
                  bRollIdeas: { type: "array", items: { type: "string" } },
                },
                required: ["title", "hook", "script", "caption", "cta", "bRollIdeas"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "deliver_reel_script" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "You're going too fast. Wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits are out. Top up in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "AI did not return a script. Try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const args = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(args), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-script error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});