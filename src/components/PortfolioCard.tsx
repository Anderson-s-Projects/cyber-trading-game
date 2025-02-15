
import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const PortfolioCard = () => {
  const { data: portfolioData, refetch } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: portfolio, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return portfolio || { cash_balance: 100000, invested_value: 0 };
    }
  });

  useEffect(() => {
    // Subscribe to real-time updates on stock_transactions
    const channel = supabase
      .channel('stock-transactions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stock_transactions'
        },
        () => {
          // Refetch portfolio data when new transactions occur
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const totalValue = (portfolioData?.cash_balance || 0) + (portfolioData?.invested_value || 0);
  const dayChange = 0; // This would need to be calculated based on previous day's value
  const dayChangePercent = 0; // This would need to be calculated based on previous day's value
  const isPositiveDay = dayChange >= 0;

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="text-neonblue" />
          <h3 className="text-xl font-grotesk">Portfolio</h3>
        </div>
        <span className="text-cybersilver text-sm">Updated just now</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 glassmorphism">
          <p className="text-cybersilver mb-1">Total Value</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${totalValue.toLocaleString()}</span>
            <div className="flex items-center text-green-400">
              <ArrowUpRight size={16} />
              <span className="text-sm">-</span>
            </div>
          </div>
          <p className="text-sm text-cybersilver mt-2">
            Cash: ${portfolioData?.cash_balance.toLocaleString()}
          </p>
          <p className="text-sm text-cybersilver">
            Invested: ${portfolioData?.invested_value.toLocaleString()}
          </p>
        </div>
        
        <div className="p-4 glassmorphism">
          <p className="text-cybersilver mb-1">Today's Change</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {isPositiveDay ? '+' : ''}{dayChange.toLocaleString()}
            </span>
            <div className={`flex items-center ${isPositiveDay ? 'text-green-400' : 'text-red-400'}`}>
              {isPositiveDay ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm">{dayChangePercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
