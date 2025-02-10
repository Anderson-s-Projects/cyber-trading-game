
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Achievement, UserAchievement } from '@/types/auth';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export const AchievementsList = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('achievements')
          .select('*');

        if (achievementsError) throw achievementsError;

        const { data: userAchievementsData, error: userAchievementsError } = await supabase
          .from('user_achievements')
          .select('*');

        if (userAchievementsError) throw userAchievementsError;

        setAchievements(achievementsData);
        setUserAchievements(userAchievementsData);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div className="text-center">Loading achievements...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neonCyan mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = userAchievements.some(
            (ua) => ua.achievement_id === achievement.id
          );

          return (
            <Card
              key={achievement.id}
              className={`p-4 ${
                isUnlocked
                  ? 'bg-background/50 border-neonCyan'
                  : 'bg-background/20 border-gray-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${
                    isUnlocked ? 'bg-neonCyan/20 text-neonCyan' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <div className="mt-2">
                    <div className="text-sm text-gray-400">
                      XP Reward: {achievement.reward_xp}
                    </div>
                    {isUnlocked && (
                      <div className="text-sm text-neonCyan mt-1">Unlocked! 🎉</div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
