
export interface Transaction {
  id: string;
  portfolio_id: string;
  quantity: number;
  price_per_share: number;
  symbol: string;
  transaction_type: 'buy' | 'sell' | 'short' | 'cover';
  transaction_date: string;
  total_amount: number;
}
