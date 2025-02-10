
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableStocks } from '@/constants/stockData';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TransactionFormProps {
  type: string;
  onSubmit: (type: string, formData: FormData) => void;
}

export const TransactionForm = ({ type, onSubmit }: TransactionFormProps) => {
  const { toast } = useToast();
  const [selectedStock, setSelectedStock] = React.useState<string>('');
  const [currentPrice, setCurrentPrice] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchStockPrice = async (symbol: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('get-stock-price', {
        body: { symbol }
      });

      if (error) throw error;
      
      if (data.price) {
        setCurrentPrice(data.price.toFixed(2));
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

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(type, new FormData(e.currentTarget));
      }}
    >
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
            {availableStocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
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
        <label className="text-sm font-medium">Amount</label>
        <Input name="amount" type="number" placeholder="1.0" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Price (USD)</label>
        <Input 
          name="price" 
          type="number" 
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

