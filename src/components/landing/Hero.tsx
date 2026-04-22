import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            new drop · for first-time creators
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            From zero to your first{" "}
            <span className="text-gradient">3 Reels</span>
            <br />
            in <span className="relative inline-block">
              7 days.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q100 -2 198 8" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            No camera. No editing degree. No vibes-only excuses. ReelKit gives you the AI scripts, hooks, and 7-day plan to actually <em className="not-italic text-foreground">post</em> — not just plan to post.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group">
                Generate my first script
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how">
              <Button variant="ghost" size="xl" className="group">
                <Play className="mr-1 fill-current w-4 h-4" />
                See how it works
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
            <span>✓ no card needed</span>
            <span>✓ AI-powered</span>
            <span>✓ 7-day plan</span>
          </div>
        </div>

        {/* Floating phone mockup */}
        <div className="relative mt-20 max-w-md mx-auto animate-float">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-primary/40 blur-3xl rounded-full" />
          <div className="relative aspect-[9/16] rounded-[2.5rem] border-4 border-foreground/20 bg-card shadow-pop overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-background" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="space-y-2 mb-4">
                <div className="text-xs font-mono text-primary">@you · 12.3k views</div>
                <div className="text-foreground font-bold leading-tight">"POV: I posted my first reel and it actually popped off 🔥"</div>
              </div>
              <div className="flex gap-2 text-[10px] font-mono text-muted-foreground">
                <span className="px-2 py-1 rounded bg-background/60">#firstreel</span>
                <span className="px-2 py-1 rounded bg-background/60">#contentcreator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};