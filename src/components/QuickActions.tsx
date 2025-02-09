
import React from 'react';
import { Plus, TrendingUp, Send, History } from 'lucide-react';

const actions = [
  { icon: Plus, label: 'Buy', color: 'text-green-400' },
  { icon: TrendingUp, label: 'Trade', color: 'text-neonblue' },
  { icon: Send, label: 'Transfer', color: 'text-neonpink' },
  { icon: History, label: 'History', color: 'text-purple-400' },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          className="cyber-card flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform"
        >
          <Icon className={`${color} mb-2`} size={24} />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};
