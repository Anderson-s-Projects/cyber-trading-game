
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Network, Brain, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CareerData {
  id: string;
  current_path: 'legitimate' | 'criminal';
  current_level: string;
  heat_level: number;
  reputation_score: number;
  technical_skills: number;
  network_size: number;
}

interface CareerLevelDefinition {
  id: string;
  path: 'legitimate' | 'criminal';
  level: string;
  required_reputation: number;
  required_technical_skills: number;
  required_network_size: number;
  description: string;
  unlocked_features: string[];
}

export const CareerStatus = () => {
  const [career, setCareer] = useState<CareerData | null>(null);
  const [nextLevel, setNextLevel] = useState<CareerLevelDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeCareer = async () => {
      try {
        // Get the current user's ID
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Try to fetch existing career data
        const { data: careerData, error } = await supabase
          .from('user_careers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (!careerData) {
          // Create new career record if none exists
          const { data: newCareer, error: createError } = await supabase
            .from('user_careers')
            .insert([
              {
                user_id: user.id,
                current_path: 'legitimate',
                current_level: 'retail_trader',
                heat_level: 0,
                reputation_score: 0,
                technical_skills: 0,
                network_size: 0
              }
            ])
            .select('*')
            .single();

          if (createError) throw createError;
          setCareer(newCareer);
          
          toast({
            title: "Career Initialized",
            description: "Welcome to your trading career! Start with some basic trades to build your reputation.",
          });
        } else {
          setCareer(careerData);
          
          // Check for level progression
          const { data: progression, error: progressionError } = await supabase
            .rpc('check_career_progression', { user_id: user.id });
            
          if (progressionError) throw progressionError;
          
          if (progression?.levelUp) {
            toast({
              title: "Level Up!",
              description: `Congratulations! You've advanced to ${progression.newLevel.replace(/_/g, ' ')}!`,
            });
            setCareer(prev => prev ? { ...prev, current_level: progression.newLevel } : null);
          }
        }

        // Fetch next level requirements if career exists
        if (careerData || newCareer) {
          const { data: levelData, error: levelError } = await supabase
            .from('career_level_definitions')
            .select('*')
            .eq('path', careerData?.current_path || 'legitimate')
            .gt('required_reputation', careerData?.reputation_score || 0)
            .order('required_reputation', { ascending: true })
            .limit(1)
            .single();

          if (levelError && levelError.code !== 'PGRST116') {
            console.error('Error fetching next level:', levelError);
          } else {
            setNextLevel(levelData);
          }
        }
      } catch (error) {
        console.error('Error in career data fetch:', error);
        toast({
          title: "Error",
          description: "Failed to load career data. Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    initializeCareer();
  }, [toast]);

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
          Unable to load career data. Please try refreshing the page.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-neonCyan">Career Status</h2>
          <div className="text-gray-400 mt-1">
            {nextLevel?.description || "Maximium level reached"}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold capitalize">{career.current_level.replace(/_/g, ' ')}</p>
          <p className="text-gray-400 capitalize">{career.current_path} Path</p>
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{career.reputation_score}</span>
                {nextLevel && (
                  <span className="text-sm text-gray-600">
                    <ChevronRight className="inline w-4 h-4" />
                    {nextLevel.required_reputation}
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={(career.reputation_score / (nextLevel?.required_reputation || 1000)) * 100} 
              className="bg-background h-2" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Brain className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Technical Skills</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{career.technical_skills}</span>
                {nextLevel && (
                  <span className="text-sm text-gray-600">
                    <ChevronRight className="inline w-4 h-4" />
                    {nextLevel.required_technical_skills}
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={(career.technical_skills / (nextLevel?.required_technical_skills || 100)) * 100} 
              className="bg-background h-2" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-green-500/20">
            <Network className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Network Size</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{career.network_size}</span>
                {nextLevel && (
                  <span className="text-sm text-gray-600">
                    <ChevronRight className="inline w-4 h-4" />
                    {nextLevel.required_network_size}
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={(career.network_size / (nextLevel?.required_network_size || 1000)) * 100} 
              className="bg-background h-2" 
            />
          </div>
        </div>

        {nextLevel && (
          <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-background/30">
            <h3 className="text-lg font-semibold mb-2">Next Level: {nextLevel.level.replace(/_/g, ' ')}</h3>
            <p className="text-gray-400 text-sm">{nextLevel.description}</p>
            {nextLevel.unlocked_features && nextLevel.unlocked_features.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-400">Unlocks:</p>
                <ul className="list-disc list-inside text-sm text-gray-500">
                  {nextLevel.unlocked_features.map((feature: string) => (
                    <li key={feature}>{feature.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CareerStatus;
