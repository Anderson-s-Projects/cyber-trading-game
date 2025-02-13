
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const PortfolioCard = () => {
  const [portfolioData, setPortfolioData] = useState({
    cashBalance: 100000, // Default starting cash
    investedValue: 0,
    dayChange: 0,
    dayChangePercent: 0
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch user's portfolio data
        const { data: portfolio, error } = await supabase
          .from('user_portfolios')
          .select('cash_balance, invested_value')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching portfolio:', error);
          return;
        }

        if (portfolio) {
          setPortfolioData(prev => ({
            ...prev,
            cashBalance: portfolio.cash_balance,
            investedValue: portfolio.invested_value || 0
          }));
        }
      } catch (error) {
        console.error('Error in portfolio fetch:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  const totalValue = portfolioData.cashBalance + portfolioData.investedValue;
  const isPositiveDay = portfolioData.dayChange >= 0;

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="text-neonblue" />
          <h3 className="text-xl font-grotesk">Portfolio</h3>
        </div>
        <span className="text-cybersilver text-sm">Updated 2m ago</span>
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
            Cash: ${portfolioData.cashBalance.toLocaleString()}
          </p>
          <p className="text-sm text-cybersilver">
            Invested: ${portfolioData.investedValue.toLocaleString()}
          </p>
        </div>
        
        <div className="p-4 glassmorphism">
          <p className="text-cybersilver mb-1">Today's Change</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {isPositiveDay ? '+' : ''}{portfolioData.dayChange.toLocaleString()}
            </span>
            <div className={`flex items-center ${isPositiveDay ? 'text-green-400' : 'text-red-400'}`}>
              {isPositiveDay ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm">{portfolioData.dayChangePercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
