'use client';

import { LayoutList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  OrderThead,
  OrderTbody,
  OrdersStatus,
  OrderFilterHeader,
} from '@/features/orders/components';
import { useGetAllOrdersQuery } from '@/features/orders/api';
import { SearchInput } from './search-input';
import { useOrderUi } from '../hooks/use-order-ui';
import { useFilterOrders } from '../hooks/use-filter-orders';
import { useHandleStatusUpdate } from '../hooks/use-handle-status-update';

export const AdminComponent = () => {
  const { data: orders } = useGetAllOrdersQuery();

  const ui = useOrderUi();

  const { filteredOrders } = useFilterOrders({ orders, ...ui });

  const { handleStatusUpdate } = useHandleStatusUpdate();

  const { filter, search, setFilter, setSearch } = ui;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <LayoutList className="w-6 h-6 text-primary" />
            <OrdersStatus orders={orders} />
          </div>

          <SearchInput search={search} setSearch={setSearch} />
        </div>

        <Card className="border-border/60 shadow-sm">
          <OrderFilterHeader
            filter={filter}
            orders={orders}
            setFilter={setFilter}
          />

          <div className="bg-background rounded-b-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <OrderThead />
                <OrderTbody
                  filteredOrders={filteredOrders}
                  handleStatusUpdate={handleStatusUpdate}
                />
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
