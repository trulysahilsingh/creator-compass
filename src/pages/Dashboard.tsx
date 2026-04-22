import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Wand2, Copy, Check, ArrowLeft, Loader2, Film } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Beat {
  timestamp: string;
  visual: string;
  voiceover: string;
}

interface ScriptResult {
  title: string;
  hook: string;
  script: Beat[];
  caption: string;
  cta: string;
  bRollIdeas: string[];
}

const NICHES = ["lifestyle", "fitness", "food", "tech", "fashion", "education", "comedy", "finance", "beauty", "travel"];
const TONES = ["energetic + relatable", "chill + thoughtful", "funny + sarcastic", "bold + confident", "warm + friendly"];
const DURATIONS = ["15 seconds", "30 seconds", "45 seconds", "60 seconds"];
const HOOKS = ["curiosity gap", "bold statement", "POV / story", "controversial take", "question + reveal"];

const Dashboard = () => {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("lifestyle");
  const [tone, setTone] = useState(TONES[0]);
  const [duration, setDuration] = useState("30 seconds");
  const [hookStyle, setHookStyle] = useState("curiosity gap");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const onGenerate = async () => {
    if (topic.trim().length < 5) {
      toast.error("Tell us a bit more about your reel idea.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-script", {
        body: { topic, niche, tone, duration, hookStyle },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data as ScriptResult);
      toast.success("Your script is ready 🔥");
    } catch (e: any) {
      toast.error(e?.message || "Couldn't generate the script. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 1500);
  };

  const examples = [
    "5 things I wish I knew before starting my finance journey at 22",
    "POV: you're trying matcha for the first time",
    "the underrated productivity hack nobody talks about",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> back to home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">ReelKit Studio</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground hidden sm:block">AI · powered</span>
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-10">
          <p className="text-sm font-mono text-primary mb-2">// script studio</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Cook up your <span className="text-gradient">next reel</span> 🍳
          </h1>
          <p className="text-muted-foreground text-lg">
            Drop your idea. We'll turn it into a full script — hook, beats, caption, the whole drop.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">
          {/* Left: form */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-card h-fit lg:sticky lg:top-24">
            <div className="space-y-5">
              <div>
                <Label htmlFor="topic" className="font-bold mb-2 block">
                  What's your reel about? <span className="text-accent">*</span>
                </Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. why I quit my 9-5 to start a matcha brand"
                  className="min-h-[100px] resize-none bg-background border-border focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTopic(ex)}
                      className="text-[11px] font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors"
                    >
                      ✨ {ex.slice(0, 32)}…
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-mono mb-1.5 block text-muted-foreground">niche</Label>
                  <Select value={niche} onValueChange={setNiche}>
                    <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {NICHES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-mono mb-1.5 block text-muted-foreground">duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-mono mb-1.5 block text-muted-foreground">tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-mono mb-1.5 block text-muted-foreground">hook style</Label>
                  <Select value={hookStyle} onValueChange={setHookStyle}>
                    <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {HOOKS.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={onGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    cooking...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate my script
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right: result */}
          <div className="min-h-[500px]">
            {!result && !loading && <EmptyState />}
            {loading && <LoadingState />}
            {result && (
              <div className="space-y-5 animate-fade-up">
                {/* Title + Hook */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-primary/30">
                  <p className="text-xs font-mono text-primary mb-2">// reel title</p>
                  <h2 className="text-2xl font-bold mb-5">{result.title}</h2>
                  <p className="text-xs font-mono text-accent mb-2">// the hook (first 3 seconds)</p>
                  <p className="text-xl font-bold leading-snug">"{result.hook}"</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4"
                    onClick={() => copy("hook", result.hook)}
                  >
                    {copied === "hook" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    copy hook
                  </Button>
                </div>

                {/* Beats */}
                <Section title="The script · beat by beat" mono="// shot list">
                  <div className="space-y-3">
                    {result.script.map((beat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-xs px-2 py-1 rounded bg-primary/15 text-primary">
                            {beat.timestamp}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">beat {i + 1}</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs font-mono text-accent mb-1">visual</p>
                            <p>{beat.visual}</p>
                          </div>
                          <div>
                            <p className="text-xs font-mono text-secondary mb-1">voiceover</p>
                            <p>{beat.voiceover}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <div className="grid md:grid-cols-2 gap-5">
                  <Section title="B-roll ideas" mono="// extra shots">
                    <ul className="space-y-2">
                      {result.bRollIdeas.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-primary">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section title="CTA" mono="// the ask">
                    <p className="text-base font-bold mb-3">"{result.cta}"</p>
                    <Button variant="ghost" size="sm" onClick={() => copy("cta", result.cta)}>
                      {copied === "cta" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      copy
                    </Button>
                  </Section>
                </div>

                <Section title="Caption + hashtags" mono="// for the post">
                  <p className="text-sm whitespace-pre-wrap mb-4">{result.caption}</p>
                  <Button variant="hero" size="sm" onClick={() => copy("caption", result.caption)}>
                    {copied === "caption" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    copy caption
                  </Button>
                </Section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const Section = ({ title, mono, children }: { title: string; mono: string; children: React.ReactNode }) => (
  <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
    <p className="text-xs font-mono text-primary mb-1">{mono}</p>
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    {children}
  </div>
);

const EmptyState = () => (
  <div className="h-full min-h-[500px] grid place-items-center p-10 rounded-2xl border border-dashed border-border bg-card/30">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mx-auto mb-5">
        <Film className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">Your script appears here</h3>
      <p className="text-muted-foreground text-sm">
        Drop a topic on the left, hit generate, and watch the AI turn it into a full reel script — hook, beats, caption, the whole vibe.
      </p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="space-y-4">
    <div className="h-32 rounded-2xl bg-gradient-to-r from-card via-muted to-card bg-[length:200%_100%] animate-shimmer" />
    <div className="h-48 rounded-2xl bg-gradient-to-r from-card via-muted to-card bg-[length:200%_100%] animate-shimmer" />
    <div className="h-32 rounded-2xl bg-gradient-to-r from-card via-muted to-card bg-[length:200%_100%] animate-shimmer" />
    <p className="text-center text-sm font-mono text-muted-foreground animate-pulse">
      ✨ AI is cooking your script...
    </p>
  </div>
);

export default Dashboard;