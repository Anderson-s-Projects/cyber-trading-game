
export interface PlayerState {
  id: string;
  username: string;
  accountType: 'retail' | 'professional' | 'fund_manager' | 'investment_bank' | 'market_maker';
  portfolio: Portfolio;
  heatLevel: number;
  legalReputation: number;
  criminalReputation: number;
  skills: PlayerSkills;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  totalValue: number;
}

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentValue: number;
}

export interface PlayerSkills {
  technicalAnalysis: number;
  fundamentalAnalysis: number;
  criminalSkills: number;
}
