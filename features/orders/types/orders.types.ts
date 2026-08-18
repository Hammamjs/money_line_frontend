import { Currency } from '@/features/currency/types';

export type OrderStatus = 'success' | 'pending';
export type Order = {
  id: string;
  status: OrderStatus;
  userId: string;
  phone: string;
  accountHolderName: string;
  paymentProvider: string;
  transactionProof: string;
  fromCurrency: Pick<Currency, 'code' | 'flag' | 'name'>;
  toCurrency: Pick<Currency, 'code' | 'flag' | 'name'>;
  note?: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

export type OrderStatusQuery = {
  id: string;
  status: OrderStatus;
};
