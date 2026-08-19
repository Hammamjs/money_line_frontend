'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OrderFilterTabs } from './order-filter-tabs';
import { FilteredOrdersContent } from './filtered-orders-content';
import { OrderDetailModal } from './order-detail-modal';
import { useOrdersUi } from '../hooks/use-orders-ui';
import { useFiltered } from '../hooks/use-filtered';
import { useTranslation } from '@/lib/i18n';

export const OrdersComponent = () => {
  const { filter, orders, selected, setFilter, setSelected } = useOrdersUi();
  const { counts, filtered } = useFiltered({ orders, filter });

  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t.myOrders}
          </h1>
          <Link href="/transfer">
            <Button
              size="sm"
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90"
            >
              + {t.startTransfer}
            </Button>
          </Link>
        </div>

        <OrderFilterTabs
          counts={counts}
          filter={filter}
          orders={orders}
          setFilter={setFilter}
        />

        <FilteredOrdersContent
          filter={filter}
          filtered={filtered}
          setSelected={setSelected}
        />
      </div>

      <OrderDetailModal
        order={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};
