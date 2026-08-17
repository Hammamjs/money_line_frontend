import { Order, OrderStatus } from '@/features/orders/types';
import { OrderRow } from './order-row';

type Props = {
  filteredOrders: Order[] | undefined;
  handleStatusUpdate: (orderId: string, status: OrderStatus) => void;
};

export const OrderTableRows = ({
  filteredOrders,
  handleStatusUpdate,
}: Props) => {
  return filteredOrders?.map((order) => (
    <OrderRow
      handleStatusUpdate={handleStatusUpdate}
      order={order}
      key={order.id}
    />
  ));
};
