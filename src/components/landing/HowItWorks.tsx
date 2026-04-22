const steps = [
  {
    n: "01",
    title: "Tell the AI what you're about",
    body: "Your niche, vibe, and what you want to say. Takes 30 seconds.",
    tag: "Day 1",
  },
  {
    n: "02",
    title: "Get a script that doesn't suck",
    body: "Hook, beats, B-roll, caption, hashtags — generated in seconds. Edit it or use as-is.",
    tag: "Day 2-3",
  },
  {
    n: "03",
    title: "Film with your phone, post, repeat",
    body: "Follow the 7-day plan. Three reels live by Day 7. Real momentum, not 'someday'.",
    tag: "Day 4-7",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24 bg-card/30 border-y border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-mono text-primary mb-3">// 3 steps. that's it.</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            How you go from <span className="text-gradient">idea → posted</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="p-8 rounded-2xl bg-background border border-border h-full hover:ring-glow transition-all">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-5xl font-bold text-gradient">{s.n}</span>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-accent/15 text-accent">{s.tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10 text-primary text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};