import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order } from '../types';
import { useTranslation } from '@/lib/i18n';

type Props = {
  orders: Order[] | undefined;
  filter: string;
  counts: {
    all: number;
    pending: number;
    success: number;
  };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const OrderFilterTabs = ({
  orders,
  filter,
  setFilter,
  counts,
}: Props) => {
  const { t } = useTranslation();

  if (!orders || orders.length === 0) return;

  return (
    <div className="mb-5 overflow-x-auto">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">
            {t.filterAll} ({counts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {t.pending} ({counts.pending})
          </TabsTrigger>
          <TabsTrigger value="processing">
            {t.processing} ({counts.success})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
