import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center">
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold">ReelKit</span>
          <span className="text-muted-foreground text-sm ml-2">© 2026 · made for first-timers</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground font-mono">
          <a href="#why" className="hover:text-foreground transition-colors">why</a>
          <a href="#how" className="hover:text-foreground transition-colors">how</a>
          <a href="#faq" className="hover:text-foreground transition-colors">faq</a>
        </div>
      </div>
    </footer>
  );
};