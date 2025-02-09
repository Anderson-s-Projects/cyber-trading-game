
import { MarketChart } from '@/components/MarketChart';
import { PortfolioCard } from '@/components/PortfolioCard';
import { QuickActions } from '@/components/QuickActions';

const Index = () => {
  return (
    <div className="min-h-screen matrix-bg p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-grotesk font-bold bg-gradient-to-r from-neonblue to-neonpink bg-clip-text text-transparent animate-matrix-fade">
          Stock Wars: NeoMarket
        </h1>
        <p className="text-cybersilver mt-2 animate-cyber-slide">
          Welcome to the future of trading
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <QuickActions />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MarketChart />
          </div>
          <div>
            <PortfolioCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
