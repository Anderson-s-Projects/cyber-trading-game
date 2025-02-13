
export const availableStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
];

export const actions = [
  { icon: 'Plus', label: 'Buy', color: 'text-green-400', action: 'buy' },
  { icon: 'TrendingUp', label: 'Trade', color: 'text-neonblue', action: 'trade' },
  { icon: 'Send', label: 'Transfer', color: 'text-neonpink', action: 'transfer' },
  { icon: 'History', label: 'History', color: 'text-purple-400', action: 'history' },
] as const;
