
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Network, Brain } from 'lucide-react';

interface CareerData {
  id: string;
  current_path: 'legitimate' | 'criminal';
  current_level: string;
  heat_level: number;
  reputation_score: number;
  technical_skills: number;
  network_size: number;
}

export const CareerStatus = () => {
  const [career, setCareer] = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const { data: careerData, error } = await supabase
          .from('user_careers')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching career data:', error);
          return;
        }

        setCareer(careerData);
      } catch (error) {
        console.error('Error in career data fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-background/50">
        <div className="text-center text-gray-400">Loading career data...</div>
      </Card>
    );
  }

  if (!career) {
    return (
      <Card className="p-6 bg-background/50">
        <div className="text-center text-gray-400">
          No career data found. Start trading to begin your career!
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background/50">
      <h2 className="text-2xl font-bold text-neonCyan mb-4">Career Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-400">Current Path</p>
          <p className="text-xl font-bold capitalize">{career.current_path}</p>
        </div>
        <div>
          <p className="text-gray-400">Current Level</p>
          <p className="text-xl font-bold capitalize">
            {career.current_level.replace(/_/g, ' ')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-red-500/20">
            <Flame className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Heat Level</span>
              <span className="text-sm text-gray-400">{career.heat_level}%</span>
            </div>
            <Progress value={career.heat_level} className="bg-background h-2" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-yellow-500/20">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Reputation</span>
              <span className="text-sm text-gray-400">{career.reputation_score}/1000</span>
            </div>
            <Progress value={(career.reputation_score / 1000) * 100} className="bg-background h-2" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Brain className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Technical Skills</span>
              <span className="text-sm text-gray-400">{career.technical_skills}%</span>
            </div>
            <Progress value={career.technical_skills} className="bg-background h-2" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-green-500/20">
            <Network className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Network Size</span>
              <span className="text-sm text-gray-400">{career.network_size}/1000</span>
            </div>
            <Progress value={(career.network_size / 1000) * 100} className="bg-background h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

// Add a default export as well for better module compatibility
export default CareerStatus;
