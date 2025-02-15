
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface TransactionFormProps {
  type: 'buy' | 'sell' | 'short' | 'cover';
  onSubmit: (type: 'buy' | 'sell' | 'short' | 'cover', formData: FormData) => void;
}

export const TransactionForm = ({ type, onSubmit }: TransactionFormProps) => {
  const { toast } = useToast();
  const [selectedStock, setSelectedStock] = React.useState<string>('');
  const [currentPrice, setCurrentPrice] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch available stocks from stock_market_data
  const { data: availableStocks } = useQuery({
    queryKey: ['availableStocks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_market_data')
        .select('ticker, company_name, close_price')
        .order('ticker');

      if (error) throw error;
      return data;
    }
  });

  const fetchStockPrice = async (ticker: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('stock_market_data')
        .select('close_price')
        .eq('ticker', ticker)
        .single();

      if (error) throw error;
      
      if (data?.close_price) {
        setCurrentPrice(data.close_price.toString());
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      toast({
        title: "Error",
        description: "Failed to fetch stock price. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockSelection = (value: string) => {
    setSelectedStock(value);
    if (value) {
      fetchStockPrice(value);
    } else {
      setCurrentPrice('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(type, formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Stock Symbol</label>
        <Select
          value={selectedStock}
          onValueChange={handleStockSelection}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a stock" />
          </SelectTrigger>
          <SelectContent>
            {availableStocks?.map((stock) => (
              <SelectItem key={stock.ticker} value={stock.ticker}>
                {stock.ticker} - {stock.company_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="symbol"
          type="hidden"
          value={selectedStock}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Quantity</label>
        <Input 
          name="quantity" 
          type="number" 
          step="0.01"
          min="0.01" 
          placeholder="1.0" 
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price (USD)</label>
        <Input 
          name="price_per_share" 
          type="number" 
          step="0.01"
          min="0.01"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          placeholder={isLoading ? "Loading..." : "Price"}
          required 
        />
      </div>

      <Button type="submit" className="w-full">
        Confirm {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    </form>
  );
};
