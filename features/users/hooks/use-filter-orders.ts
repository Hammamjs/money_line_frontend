import { Order } from '@/features/orders/types';
import { useMemo } from 'react';

type Props = {
  orders: Order[] | undefined;
  search: string;
  filter: string;
};

export const useFilterOrders = ({ orders, search, filter }: Props) => {
  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase();

    return orders?.filter((o) => {
      const matchFilter = filter === 'all' || o.status === filter;

      const matchSearch =
        !q ||
        o.user.username.toLowerCase().includes(q) ||
        o.user.email.toLowerCase().includes(q) ||
        o.id.includes(q);

      return matchFilter && matchSearch;
    });
  }, [orders, search, filter]);

  return {
    filteredOrders,
  };
};
