
import React from 'react';
import { Plus, TrendingUp, Send, History, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const actions = [
  { icon: Plus, label: 'Buy', color: 'text-green-400', action: 'buy' },
  { icon: Minus, label: 'Sell', color: 'text-red-400', action: 'sell' },
  { icon: TrendingUp, label: 'Trade', color: 'text-neonblue', action: 'trade' },
  { icon: Send, label: 'Transfer', color: 'text-neonpink', action: 'transfer' },
  { icon: History, label: 'History', color: 'text-purple-400', action: 'history' },
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
        action={(formData) => handleTransaction(type, formData)}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">Symbol</label>
          <Input name="symbol" placeholder="NVDA" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input name="amount" type="number" placeholder="1.0" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (USD)</label>
          <Input name="price" type="number" placeholder="100.00" required />
        </div>
        <Button type="submit" className="w-full">
          Confirm {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </form>
    );
  };

  return (
    <div className="grid grid-cols-5 gap-4">
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
