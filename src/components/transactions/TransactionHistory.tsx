
import React from 'react';
import type { Transaction } from '@/types/transaction';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-muted-foreground">No transaction history yet.</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
            <div>
              <p className="font-medium">{tx.transaction_type.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">
                {tx.quantity} {tx.symbol} @ ${tx.price_per_share}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">${tx.total_amount.toFixed(2)}</p>
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
