
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Newspaper, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const News = () => {
  const { data: marketUpdates } = useQuery({
    queryKey: ['marketUpdates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-cyberDark text-white">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
          News & Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Breaking News Section */}
          <Card className="col-span-1 md:col-span-2 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="text-neonCyan" />
              <h2 className="text-xl font-bold">Breaking News</h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold mb-2">Market Volatility Increases Amid Tech Sector Shifts</h3>
                      <p className="text-sm text-gray-400">
                        Major tech stocks experiencing significant fluctuations as new regulations impact the sector...
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Market Updates */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-neonCyan" />
              <h2 className="text-xl font-bold">Market Updates</h2>
            </div>
            <div className="space-y-3">
              {marketUpdates?.map((update, index) => (
                <div key={index} className="p-3 border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{update.symbol}</span>
                    <span className={update.price > 0 ? 'text-green-400' : 'text-red-400'}>
                      ${update.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="col-span-1 md:col-span-2 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-neonCyan" />
              <h2 className="text-xl font-bold">Upcoming Events</h2>
            </div>
            <div className="space-y-4">
              {[1, 2].map((_, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Quarterly Earnings Report</h3>
                  <p className="text-sm text-gray-400 mb-2">Major tech companies releasing Q4 earnings...</p>
                  <div className="flex items-center gap-2 text-sm text-neonCyan">
                    <Calendar className="w-4 h-4" />
                    <span>Dec 15, 2023</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-neonCyan" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="p-3 border border-white/10 rounded-lg">
                  <p className="text-sm">New trading opportunity in tech sector</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;
