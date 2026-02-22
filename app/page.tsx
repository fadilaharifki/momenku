import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Templates } from "@/components/templates";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Templates />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
