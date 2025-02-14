
import { Database } from "@/integrations/supabase/types";

export type TutorialStep = Database["public"]["Tables"]["tutorial_steps"]["Row"];
export type TutorialProgress = Database["public"]["Tables"]["user_tutorial_progress"]["Row"];

export interface TutorialStepDisplay extends TutorialStep {
  isCompleted?: boolean;
}
