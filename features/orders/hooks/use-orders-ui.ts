import { selectUser } from '@/features/auth/store/slices/auth-slice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../api/orders-slice.api';
import { Order } from '../types/orders.types';

export const useOrdersUi = () => {
  const { data: orders } = useGetUserOrdersQuery();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Order | null>(null);

  const user = useSelector(selectUser);

  return {
    orders,
    filter,
    setFilter,
    selected,
    setSelected,
    user,
  };
};
