
import React, { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Lightbulb, CheckCircle2, PlayCircle, ArrowRight, BookOpen } from 'lucide-react';
import type { TutorialStep, TutorialProgress } from '@/types/tutorial';

const Tutorial = () => {
  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { data: steps = [] } = useQuery<TutorialStep[]>({
    queryKey: ['tutorialSteps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tutorial_steps')
        .select('*')
        .order('step_order');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: progress = [] } = useQuery<TutorialProgress[]>({
    queryKey: ['tutorialProgress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_tutorial_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    }
  });

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  const completedSteps = progress.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleCompleteStep = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_tutorial_progress')
        .upsert({
          user_id: user.id,
          step_id: currentStep.id,
          completed_at: new Date().toISOString(),
          sandbox_attempts: currentStep.sandbox_enabled ? 1 : 0
        });

      if (error) throw error;

      toast({
        title: "Step completed!",
        description: currentStep.sandbox_enabled 
          ? "Great job completing the practice scenario!" 
          : "You've learned something new!",
      });

      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(curr => curr + 1);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics':
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'trading':
        return <PlayCircle className="w-5 h-5 text-green-400" />;
      case 'analysis':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'advanced':
        return <CheckCircle2 className="w-5 h-5 text-purple-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-cyberDark text-white">
      <NavBar />
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
            NeoMarket Tutorial
          </h1>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-gray-400 mt-2">
            {completedSteps} of {totalSteps} steps completed
          </p>
        </div>

        {currentStep && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(currentStep.category)}
                  <span className="text-sm text-gray-400 capitalize">{currentStep.category}</span>
                </div>
                <h2 className="text-2xl font-bold">{currentStep.title}</h2>
                <p className="text-gray-300">{currentStep.description}</p>
                {currentStep.sandbox_enabled && (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-green-400 text-sm">
                      Practice Mode Available
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="col-span-1 md:col-span-2 p-6 bg-background/20 backdrop-blur">
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Tutorial content will be dynamically loaded here */}
                  <p className="text-gray-300">
                    Interactive tutorial content for step {currentStep.step_order} will be displayed here.
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStepIndex(i => Math.max(0, i - 1))}
                    disabled={currentStepIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleCompleteStep}
                    className="bg-neonPurple hover:bg-neonPurple/80"
                  >
                    {currentStepIndex === steps.length - 1 ? (
                      'Complete Tutorial'
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
