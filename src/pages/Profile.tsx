
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { TransactionHistory } from '@/components/transactions/TransactionHistory';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Award, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { UserProfile } from '@/types/auth';
import type { Transaction } from '@/types/transaction';

const Profile = () => {
  const navigate = useNavigate();

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile as UserProfile;
    }
  });

  const { data: portfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: portfolio } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return portfolio;
    }
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!portfolio?.id) return [];
      
      const { data } = await supabase
        .from('stock_transactions')
        .select('*')
        .eq('portfolio_id', portfolio.id)
        .order('transaction_date', { ascending: false });

      return (data || []).map(tx => ({
        ...tx,
        transaction_type: tx.transaction_type as Transaction['transaction_type']
      })) as Transaction[];
    },
    enabled: !!portfolio?.id
  });

  return (
    <div className="min-h-screen bg-cyberDark text-white">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
          Trader Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-neonPurple to-neonCyan flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{userProfile?.username || 'Trader'}</h2>
                <p className="text-sm text-gray-400">Level {userProfile?.level || 1}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Experience</span>
                <span>{userProfile?.experience_points || 0} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Value</span>
                <span>${((portfolio?.cash_balance || 0) + (portfolio?.invested_value || 0)).toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-2 p-6 bg-background/20 backdrop-blur">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="text-neonCyan" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(userProfile?.achievements as Array<{ name: string; description: string }> || []).map((achievement, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/40">
                  <h4 className="font-bold">{achievement.name}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-3 p-6 bg-background/20 backdrop-blur">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-neonCyan" />
              Transaction History
            </h3>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <TransactionHistory transactions={transactions || []} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
