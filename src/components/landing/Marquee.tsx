const items = [
  "no editing skills needed",
  "AI writes the hook",
  "post in 7 days",
  "viral-ready scripts",
  "Gen-Z energy",
  "actual results",
  "templates included",
  "stop overthinking",
];

export const Marquee = () => {
  return (
    <div className="border-y border-border bg-card/50 overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-6 text-sm font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-6" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};