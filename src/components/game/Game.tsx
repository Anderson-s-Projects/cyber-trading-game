
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { PlayerState } from '@/types/player';

export const Game = () => {
  const [player, setPlayer] = useState<PlayerState>({
    id: '1',
    username: 'Player1',
    accountType: 'retail',
    portfolio: {
      cash: 100000,
      positions: [],
      totalValue: 100000
    },
    heatLevel: 0,
    legalReputation: 1000,
    criminalReputation: 0,
    skills: {
      technicalAnalysis: 1,
      fundamentalAnalysis: 1,
      criminalSkills: 0
    }
  });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Player Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Heat Level</span>
              <span>{player.heatLevel}%</span>
            </div>
            <Progress value={player.heatLevel} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Legal Rep</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-500" />
                <span>{player.legalReputation}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Criminal Rep</h3>
              <div className="flex items-center gap-2">
                <TrendingDown className="text-red-500" />
                <span>{player.criminalReputation}</span>
              </div>
            </div>
          </div>

          {player.heatLevel > 70 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Risk Alert</AlertTitle>
              <AlertDescription>
                Your heat level is critically high. Consider reducing illegal activities.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Cash</h3>
              <p className="text-2xl font-bold">${player.portfolio.cash.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Total Value</h3>
              <p className="text-2xl font-bold">${player.portfolio.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
