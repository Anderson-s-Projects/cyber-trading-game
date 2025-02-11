
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '09:00', value: 4000 },
  { time: '10:00', value: 3000 },
  { time: '11:00', value: 2000 },
  { time: '12:00', value: 2780 },
  { time: '13:00', value: 1890 },
  { time: '14:00', value: 2390 },
  { time: '15:00', value: 3490 },
];

export const MarketChart = () => {
  return (
    <div className="cyber-card h-[400px] w-full">
      <h3 className="text-xl font-grotesk mb-4 text-neonblue">Market Overview</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
          <XAxis dataKey="time" stroke="#8892b0" />
          <YAxis stroke="#8892b0" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0b0f',
              border: '1px solid #00f0ff',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00f0ff"
            strokeWidth={2}
            dot={{ fill: '#00f0ff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
