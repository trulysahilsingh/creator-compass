import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from || "/dashboard";

  useEffect(() => {
    if (!authLoading && user) navigate(from, { replace: true });
  }, [user, authLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Use a valid email and a password with 6+ characters.");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("Account created — welcome to ReelKit 🎬");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.message || "Auth failed";
      if (msg.toLowerCase().includes("already")) {
        toast.error("This email is already registered. Try signing in.");
      } else if (msg.toLowerCase().includes("invalid")) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="container relative pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> back to home
        </Link>
      </div>

      <div className="container relative grid place-items-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReelKit</span>
          </div>

          <div className="text-center mb-6">
            <p className="text-xs font-mono text-primary mb-2">// the AI script studio</p>
            <h1 className="text-3xl font-bold mb-2">
              {mode === "signin" ? "welcome back 👋" : "let's get you set up ✨"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in to keep cooking scripts."
                : "Create your account and ship your first reel this week."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "signin" | "signup")}>
              <TabsList className="grid grid-cols-2 w-full mb-5">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value={mode} className="mt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-xs font-mono mb-1.5 block text-muted-foreground">
                      email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@reelkit.app"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-xs font-mono mb-1.5 block text-muted-foreground">
                      password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
                    {mode === "signup" && (
                      <p className="text-[11px] text-muted-foreground mt-1.5 font-mono">
                        min 6 characters · checked against known leaks
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : mode === "signin" ? (
                      "Sign in →"
                    ) : (
                      "Create my account →"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
            ✓ no card · ✓ instant access · ✓ your data stays yours
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;