
import React from 'react';
import { Plus, TrendingUp, Send, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';

const actions = [
  { icon: Plus, label: 'Buy', color: 'text-green-400', action: 'buy' },
  { icon: TrendingUp, label: 'Trade', color: 'text-neonblue', action: 'trade' },
  { icon: Send, label: 'Transfer', color: 'text-neonpink', action: 'transfer' },
  { icon: History, label: 'History', color: 'text-purple-400', action: 'history' },
];

// Popular tech stocks for paper trading
const availableStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
];

interface Transaction {
  type: string;
  symbol: string;
  amount: string;
  price: string;
  timestamp: Date;
}

export const QuickActions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
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

  const handleTransaction = (type: string, formData: FormData) => {
    const symbol = formData.get('symbol') as string;
    const amount = formData.get('amount') as string;
    const price = formData.get('price') as string;

    const newTransaction: Transaction = {
      type,
      symbol,
      amount,
      price,
      timestamp: new Date(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Transaction Successful",
      description: `${type.toUpperCase()}: ${amount} ${symbol} @ $${price}`,
    });
  };

  const renderDialogContent = (type: string) => {
    if (type === 'history') {
      return (
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground">No transaction history yet.</p>
          ) : (
            transactions.map((tx, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="font-medium">{tx.type.toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">
                    {tx.amount} {tx.symbol} @ ${tx.price}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tx.timestamp.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      );
    }

    return (
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleTransaction(type, new FormData(e.currentTarget));
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

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map(({ icon: Icon, label, color, action }) => (
        <Dialog key={label}>
          <DialogTrigger asChild>
            <button
              className="cyber-card flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform"
            >
              <Icon className={`${color} mb-2`} size={24} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-cyberDark border-neonPurple/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className={color} size={20} />
                <span>{label}</span>
              </DialogTitle>
            </DialogHeader>
            {renderDialogContent(action)}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
