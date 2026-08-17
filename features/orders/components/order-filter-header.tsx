import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { Order } from '@/features/orders/types';
import { useTranslation } from '@/lib/i18n';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  orders: Order[] | undefined;
};

export const OrderFilterHeader = ({ filter, orders, setFilter }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 border-b bg-background rounded-t-xl overflow-x-auto">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">
            {t.filterAll} ({orders?.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {t.pending} ({orders?.filter((o) => o.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="success">
            {t.complete} ({orders?.filter((o) => o.status === 'success').length}
            )
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
