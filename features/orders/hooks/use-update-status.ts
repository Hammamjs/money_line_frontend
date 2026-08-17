import { useUpdateOrderStatusMutation } from '../api/orders-slice.api';
import { OrderStatusQuery } from '@/features/orders/types/orders.types';

export const useUpdateStatusAction = () => {
  const [action, result] = useUpdateOrderStatusMutation();

  const updateStatus = async ({ id, status }: OrderStatusQuery) => {
    return action({ id, status }).unwrap();
  };

  return {
    updateStatus,
    ...result,
  };
};
