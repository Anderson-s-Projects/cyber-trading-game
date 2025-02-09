
import { useEffect, useState } from 'react';

const generateRandomPrice = () => {
  return (Math.random() * 1000).toFixed(2);
};

const generateRandomChange = () => {
  return (Math.random() * 10 - 5).toFixed(2);
};

const stocks = [
  { symbol: 'NVDA', name: 'NeoVida Corp' },
  { symbol: 'QNTM', name: 'Quantum Dynamics' },
  { symbol: 'CYBR', name: 'CyberSec Inc' },
  { symbol: 'META', name: 'Metaverse Systems' },
  { symbol: 'NEON', name: 'NeoNetwork' },
];

export const MarketDataStream = () => {
  const [data, setData] = useState(stocks.map(stock => ({
    ...stock,
    price: generateRandomPrice(),
    change: generateRandomChange(),
  })));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map(stock => ({
        ...stock,
        price: generateRandomPrice(),
        change: generateRandomChange(),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden h-[200px] bg-cyberDark/30 backdrop-blur-sm rounded-lg">
      <div className="animate-data-stream">
        {[...data, ...data].map((stock, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-neonPurple/20 hover:bg-neonPurple/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-neonCyan font-mono">{stock.symbol}</span>
              <span className="text-white/70">{stock.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-mono">${stock.price}</span>
              <span className={`font-mono ${parseFloat(stock.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
