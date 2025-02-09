
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl p-6 bg-cyberDark/30 backdrop-blur-sm border border-neonPurple/20 hover:border-neonPurple/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-neonPurple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-neonPurple" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonPurple via-neonCyan to-neonOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
