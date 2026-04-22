import { Brain, Calendar, Zap, Trophy } from "lucide-react";

const reasons = [
  {
    icon: Brain,
    title: "Stop staring at a blank screen",
    body: "Our AI writes hooks, beats, captions and CTAs. You just hit record. The hardest part is solved.",
    accent: "primary",
  },
  {
    icon: Calendar,
    title: "A real 7-day plan",
    body: "No more 'I'll start Monday'. Day 1 to Day 7 — exactly what to film, write and post. Pinky promise.",
    accent: "accent",
  },
  {
    icon: Zap,
    title: "Built for phones, not film school",
    body: "Front camera. Natural light. 30 seconds. We optimize for what you actually have, not what TikTok pros use.",
    accent: "secondary",
  },
  {
    icon: Trophy,
    title: "Win the algorithm, not just feel busy",
    body: "Hook in 3s. Pattern interrupts. CTAs that convert. Every script is built on what's actually working in 2025.",
    accent: "primary",
  },
];

export const Why = () => {
  return (
    <section id="why" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-mono text-primary mb-3">// the real talk</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            You don't need <span className="line-through text-muted-foreground">talent</span>.
            <br />
            You need a <span className="text-gradient">system</span>.
          </h2>
          <p className="text-lg text-muted-foreground">
            Most "creators" never post. Not because they're bad — because they're stuck. ReelKit removes every excuse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all hover:-translate-y-1 shadow-card"
            >
              <div
                className={`w-12 h-12 rounded-xl grid place-items-center mb-5 ${
                  r.accent === "primary"
                    ? "bg-primary/15 text-primary"
                    : r.accent === "accent"
                    ? "bg-accent/15 text-accent"
                    : "bg-secondary/15 text-secondary"
                }`}
              >
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{r.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};