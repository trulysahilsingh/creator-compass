import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCta = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container">
        <div className="relative max-w-4xl mx-auto p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-primary/30 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <p className="text-sm font-mono text-primary mb-4">// your move</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.05]">
              In 7 days you're either still
              <br />
              <span className="line-through text-muted-foreground">"thinking about it"</span>{" "}
              <span className="text-gradient">or posting.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Generate your first AI-powered Reel script right now. Free. Takes 30 seconds.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group">
                Open the script studio
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-6 text-xs font-mono text-muted-foreground">
              free account · no card · just vibes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};