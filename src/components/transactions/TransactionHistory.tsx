
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
};

