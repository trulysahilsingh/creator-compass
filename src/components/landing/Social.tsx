const reviews = [
  {
    quote: "Posted my first reel in 4 days. It hit 22k views. I was about to give up on content forever.",
    name: "maya k.",
    handle: "@mayamoves",
    badge: "fitness",
  },
  {
    quote: "The AI literally writes hooks better than me. I just film. 3 reels in a week is wild.",
    name: "dev s.",
    handle: "@devbuilds",
    badge: "tech",
  },
  {
    quote: "I finally stopped overthinking. The 7-day plan made it impossible to procrastinate.",
    name: "ria p.",
    handle: "@riacooks",
    badge: "food",
  },
];

export const Social = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-primary mb-3">// receipts</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Real first-time creators.
            <br />
            Real <span className="text-gradient">first reels</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all"
              style={{ transform: `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})` }}
            >
              <p className="text-lg leading-relaxed mb-6">"{r.quote}"</p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-muted-foreground font-mono text-xs">{r.handle}</div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/15 text-primary">
                  {r.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};