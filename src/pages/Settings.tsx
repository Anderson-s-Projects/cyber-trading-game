import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Volume2 } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-cyberDark text-white">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonPurple via-neonCyan to-white">
          Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <Card className="col-span-1 md:col-span-2 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-neonCyan" />
              <h2 className="text-xl font-bold">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={profile?.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input id="avatar" defaultValue={profile?.avatar_url} />
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="text-neonCyan" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Trading Alerts</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Market Updates</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>News Digest</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-neonCyan" />
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">Change Password</Button>
              <Button variant="outline" className="w-full">Enable 2FA</Button>
              <Button variant="outline" className="w-full">Security Log</Button>
            </div>
          </Card>

          {/* Appearance */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="text-neonCyan" />
              <h2 className="text-xl font-bold">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Light</Button>
                  <Button variant="outline">Dark</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Sound */}
          <Card className="col-span-1 p-6 bg-background/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Volume2 className="text-neonCyan" />
              <h2 className="text-xl font-bold">Sound</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Trading Sounds</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Alert Sounds</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="bg-neonPurple hover:bg-neonPurple/80">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
