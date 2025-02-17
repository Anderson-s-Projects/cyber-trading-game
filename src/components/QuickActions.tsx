import React from 'react';
import { Plus, TrendingUp, Send, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { actions } from '@/constants/stockData';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionHistory } from '@/components/transactions/TransactionHistory';
import type { Transaction } from '@/types/transaction';
export const QuickActions = () => {
  const {
    toast
  } = useToast();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const handleTransaction = (transaction_type: 'buy' | 'sell' | 'short' | 'cover', formData: FormData) => {
    const symbol = formData.get('symbol') as string;
    const quantity = formData.get('quantity') as string;
    const price_per_share = formData.get('price_per_share') as string;
    const total_amount = Number(quantity) * Number(price_per_share);
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      portfolio_id: '',
      // This will need to be set with the actual portfolio ID
      transaction_type,
      symbol,
      quantity: Number(quantity),
      price_per_share: Number(price_per_share),
      transaction_date: new Date().toISOString(),
      total_amount
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Successful",
      description: `${transaction_type.toUpperCase()}: ${quantity} ${symbol} @ $${price_per_share}`
    });
  };
  const renderDialogContent = (type: 'buy' | 'sell' | 'short' | 'cover' | 'history') => {
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
  return <div className="grid grid-cols-4 gap-4">
      {actions.map(({
      icon,
      label,
      color,
      action
    }) => {
      const Icon = getIcon(icon);
      return <Dialog key={label}>
            <DialogTrigger asChild>
              <button className="cyber-card flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform py-0 px-[27px]">
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
              {renderDialogContent(action as 'buy' | 'sell' | 'short' | 'cover' | 'history')}
            </DialogContent>
          </Dialog>;
    })}
    </div>;
};