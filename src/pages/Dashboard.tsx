import { PortfolioCard } from '@/components/PortfolioCard';
import { MarketChart } from '@/components/MarketChart';
import { QuickActions } from '@/components/QuickActions';
import { MarketDataStream } from '@/components/MarketDataStream';
import { AchievementsList } from '@/components/achievements/AchievementsList';
import { CareerStatus } from '@/components/career/CareerStatus';
import { NavBar } from '@/components/NavBar';
const Dashboard = () => {
  return <div className="min-h-screen bg-cyberDark text-white">
      <NavBar />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
          NeoMarket Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 px-0 py-0 my-0 mx-0">
          <div className="lg:col-span-2">
            <PortfolioCard />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MarketChart />
          </div>
          <div className="space-y-8">
            <div className="cyber-card p-4">
              <h3 className="text-xl font-grotesk mb-4 text-neonCyan">Live Market Feed</h3>
              <MarketDataStream />
            </div>
            <CareerStatus />
          </div>
        </div>

        <div className="mt-8">
          <AchievementsList />
        </div>
      </div>
    </div>;
};
export default Dashboard;