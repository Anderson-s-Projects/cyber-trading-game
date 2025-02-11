
import React, { useEffect, useRef, useState } from 'react';
import { createChart, SeriesType } from 'lightweight-charts';
import { availableStocks } from '@/constants/stockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const MarketChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedStock, setSelectedStock] = useState<string>(availableStocks[0].symbol);
  const chartRef = useRef<any>(null);
  const [candleData, setCandleData] = useState<any[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#0a0b0f' },
        textColor: '#8892b0',
      },
      grid: {
        vertLines: { color: '#2a2a3c' },
        horzLines: { color: '#2a2a3c' },
      },
      rightPriceScale: {
        borderColor: '#2a2a3c',
      },
      timeScale: {
        borderColor: '#2a2a3c',
        timeVisible: true,
      },
      crosshair: {
        vertLine: {
          color: '#00f0ff',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: '#00f0ff',
          width: 1,
          style: 3,
        },
      },
    });

    // Create series using the correct method
    const series = chart.addSeries('Line', {
      color: '#2962FF',
      lineWidth: 2,
    });

    // Generate some sample data (replace this with real API data)
    const currentDate = new Date();
    const sampleData = Array.from({ length: 50 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const basePrice = 100 + Math.random() * 50;
      return {
        time: date.toISOString().split('T')[0],
        value: basePrice + (Math.random() - 0.5) * 20,
      };
    }).reverse();

    setCandleData(sampleData);
    series.setData(sampleData);
    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  const handleStockChange = (value: string) => {
    setSelectedStock(value);
    // Here you would typically fetch new data for the selected stock
    // and update the chart using chartRef.current
    console.log('Selected stock:', value);
  };

  return (
    <div className="cyber-card w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-grotesk text-neonblue">Market Overview</h3>
        <Select value={selectedStock} onValueChange={handleStockChange}>
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
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
