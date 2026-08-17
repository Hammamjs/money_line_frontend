import { Order } from '../types/orders.types';

type UseFilteredProps = {
  orders: Order[] | undefined;
  filter: string;
};
export const useFiltered = ({ orders, filter }: UseFilteredProps) => {
  const ordersArr = [...(orders || [])];

  const filtered = ordersArr.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  const counts = {
    all: ordersArr.length,
    pending: ordersArr.filter((o) => o.status === 'pending').length,
    success: ordersArr.filter((o) => o.status === 'success').length,
  };

  return {
    filtered,
    counts,
  };
};
