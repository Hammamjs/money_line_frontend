import { OrderStatus } from '@/features/orders/types/orders.types';
import { toast } from 'sonner';
import { useUpdateStatusAction } from '../../orders/hooks/use-update-status';

export const useHandleStatusUpdate = () => {
  const { updateStatus } = useUpdateStatusAction();

  const handleStatusUpdate = (id: string, newStatus: OrderStatus) => {
    try {
      updateStatus({ id, status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
      console.log(err);
    }
  };

  return {
    handleStatusUpdate,
  };
};
