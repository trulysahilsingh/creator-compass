import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Why } from "@/components/landing/Why";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Social } from "@/components/landing/Social";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Why />
        <HowItWorks />
        <Social />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
