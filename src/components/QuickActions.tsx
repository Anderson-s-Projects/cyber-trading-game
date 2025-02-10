
import React from 'react';
import { Plus, TrendingUp, Send, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { actions } from '@/constants/stockData';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionHistory } from '@/components/transactions/TransactionHistory';
import type { Transaction } from '@/types/transaction';

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
      return <TransactionHistory transactions={transactions} />;
    }
    return <TransactionForm type={type} onSubmit={handleTransaction} />;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plus':
        return Plus;
      case 'TrendingUp':
        return TrendingUp;
      case 'Send':
        return Send;
      case 'History':
        return History;
      default:
        return Plus;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map(({ icon, label, color, action }) => {
        const Icon = getIcon(icon);
        return (
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
        )
      })}
    </div>
  );
};

