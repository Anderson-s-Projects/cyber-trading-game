
import { Building2, Cpu, Globe, Shield } from 'lucide-react';
import { MarketDataStream } from '@/components/MarketDataStream';
import { FeatureCard } from '@/components/FeatureCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyberDark text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyberDark via-cyberDark/95 to-cyberDark z-0" />
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.2),transparent_50%)]" />
        </div>
        
        <div className="container relative z-10 px-4">
          <div className="text-center mb-12 animate-float">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
              Stock Wars: NeoMarket
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Welcome to the next generation of financial metaverse experiences. Trade, compete, and dominate in a cyberpunk world where every decision shapes the market.
            </p>
            <button className="px-8 py-3 rounded-lg bg-neonPurple text-white font-semibold hover:bg-neonPurple/80 transition-colors duration-300 animate-glow">
              Enter NeoMarket
            </button>
          </div>
          
          <MarketDataStream />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Building2}
              title="Corporate Warfare"
              description="Engage in hostile takeovers and corporate espionage in our sophisticated tower defense system."
            />
            <FeatureCard
              icon={Shield}
              title="Secure Trading"
              description="Execute trades with military-grade security in our blockchain-powered marketplace."
            />
            <FeatureCard
              icon={Globe}
              title="Global Markets"
              description="Access markets worldwide with real-time data integration from major exchanges."
            />
            <FeatureCard
              icon={Cpu}
              title="AI Powered"
              description="Trade alongside AI-driven CEO personas with unique corporate strategies."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
