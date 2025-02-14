
import React from 'react';
import type { Transaction } from '@/types/transaction';
import { Badge } from '@/components/ui/badge';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'bg-green-500/20 text-green-400';
      case 'sell':
        return 'bg-red-500/20 text-red-400';
      case 'short':
        return 'bg-purple-500/20 text-purple-400';
      case 'cover':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No transaction history yet.</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg hover:bg-background/60 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <Badge className={getTransactionColor(tx.transaction_type)}>
                  {tx.transaction_type.toUpperCase()}
                </Badge>
                <span className="font-medium">{tx.symbol}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {tx.quantity} shares @ ${tx.price_per_share}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">${tx.total_amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(tx.transaction_date).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
