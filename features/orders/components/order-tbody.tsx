import { Order, OrderStatus } from '@/features/orders/types';
import { EmptyOrders } from './empty-orders';
import { OrderTableRows } from './order-table-rows';

type Props = {
  filteredOrders: Order[] | undefined;
  handleStatusUpdate: (orderId: string, status: OrderStatus) => void;
};

export const OrderTbody = ({ filteredOrders, handleStatusUpdate }: Props) => {
  return (
    <tbody className="divide-y">
      {filteredOrders?.length === 0 ? (
        <EmptyOrders />
      ) : (
        <OrderTableRows
          filteredOrders={filteredOrders}
          handleStatusUpdate={handleStatusUpdate}
        />
      )}
    </tbody>
  );
};
