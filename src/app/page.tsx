import AboutSection from '@/components/landing/about';
import CaseStudies from '@/components/landing/case-studies';
import CtaSection from '@/components/landing/cta';
import DifferentiationTable from '@/components/landing/differentiation-table';
import Footer from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import Navigation from '@/components/landing/navigation';
import Pricing from '@/components/landing/pricing';
import RoiCalculator from '@/components/landing/roi-calculator';
import SecurityProcess from '@/components/landing/security-process';
import ServicesOverview from '@/components/landing/services-overview';
import TechStack from '@/components/landing/tech-stack';
import Chatbot from '@/components/chatbot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <DifferentiationTable />
        <SecurityProcess />
        <CaseStudies />
        <ServicesOverview />
        <RoiCalculator />
        <TechStack />
        <Pricing />
        <AboutSection />
        <CtaSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
