
export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  experience_points: number;
  level: number;
  achievements: any[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  reward_xp: number;
  conditions: any;
  created_at: string;
}

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  achieved_at: string;
}
