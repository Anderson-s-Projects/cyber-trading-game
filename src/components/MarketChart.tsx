
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { availableStocks } from '@/constants/stockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StockPrice {
  price: number;
  time: string;
}

export const MarketChart = () => {
  const [selectedStock, setSelectedStock] = useState<string>(availableStocks[0].symbol);

  const { data: stockData, isLoading } = useQuery({
    queryKey: ['stockPrice', selectedStock],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-stock-price', {
        body: { symbol: selectedStock }
      });

      if (error) {
        throw error;
      }

      // Create a simple time series for the last 7 hours
      const currentDate = new Date();
      const price = data.price;
      
      return Array.from({ length: 7 }, (_, i) => {
        const time = new Date(currentDate);
        time.setHours(time.getHours() - i);
        // Add some random variation to create a more interesting chart
        const variation = (Math.random() - 0.5) * (price * 0.02); // 2% variation
        return {
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: price + variation
        };
      }).reverse();
    },
    refetchInterval: 60000 // Refetch every minute
  });

  return (
    <div className="cyber-card h-[400px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-grotesk text-neonblue">Market Overview</h3>
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-[180px] bg-background/50">
            <SelectValue placeholder="Select stock" />
          </SelectTrigger>
          <SelectContent>
            {availableStocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-neonblue">Loading...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
              <XAxis 
                dataKey="time" 
                stroke="#8892b0"
                tick={{ fill: '#8892b0' }}
              />
              <YAxis 
                stroke="#8892b0"
                tick={{ fill: '#8892b0' }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0b0f',
                  border: '1px solid #00f0ff',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#8892b0' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00f0ff"
                strokeWidth={2}
                dot={{ fill: '#00f0ff' }}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
