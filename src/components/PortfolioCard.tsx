
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';

export const PortfolioCard = () => {
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
            <span className="text-2xl font-bold">$142,934</span>
            <div className="flex items-center text-green-400">
              <ArrowUpRight size={16} />
              <span className="text-sm">4.3%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 glassmorphism">
          <p className="text-cybersilver mb-1">Today's Change</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">-$1,223</span>
            <div className="flex items-center text-red-400">
              <ArrowDownRight size={16} />
              <span className="text-sm">0.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
