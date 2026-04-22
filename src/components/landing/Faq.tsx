import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "I've literally never made a video. Is this for me?",
    a: "Yes — that's the whole point. ReelKit was built for first-time creators. The AI writes the script, the 7-day plan tells you exactly what to do each day. You don't need any prior experience.",
  },
  {
    q: "Do I need fancy gear?",
    a: "Just your phone and natural light (a window works). Every script is designed to be filmable on a phone in under 10 minutes.",
  },
  {
    q: "What if my niche is super specific?",
    a: "The AI adapts. Tell it you're a vegan baker in Bangalore or a finance nerd making memes — it'll write scripts that actually fit you, not generic 'creator' fluff.",
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "ChatGPT gives you walls of text. ReelKit gives you a structured script: hook, beat-by-beat shots, B-roll ideas, caption, and hashtags — formatted to actually film and post.",
  },
  {
    q: "Is it really free to try?",
    a: "Yep. Try the AI script generator right now, no card needed. If you like it, the full kit unlocks the 7-day plan and templates.",
  },
];

export const Faq = () => {
  return (
    <section id="faq" className="py-24 bg-card/30 border-y border-border">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-primary mb-3">// asked & answered</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Doubts? <span className="text-gradient">Killed.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background rounded-2xl border border-border px-6 data-[state=open]:border-primary/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};