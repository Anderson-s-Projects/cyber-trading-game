
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'auth' | 'profile'>('auth');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        });

        // Check for user_already_exists error
        if (signUpError) {
          const errorBody = JSON.parse((signUpError as any).body || '{}');
          if (errorBody.code === 'user_already_exists') {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive",
            });
            setIsLogin(true); // Switch to login mode
            setLoading(false);
            return;
          }
          throw signUpError;
        }
        
        if (data.user) {
          // Create initial profile
          const { error: profileError } = await supabase
            .from('user_profiles')
            .upsert({
              id: data.user.id,
              username,
              experience_points: 0,
              level: 1,
              achievements: []
            });

          if (profileError) throw profileError;

          toast({
            title: "Success!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyberDark text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
            NeoMarket
          </h1>
          <p className="mt-2 text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50"
            />
            {!isLogin && (
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-background/50"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || (!isLogin && !username)}
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername('');
            }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
