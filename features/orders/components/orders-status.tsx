import { Order } from '@/features/orders/types';
import { useTranslation } from '@/lib/i18n';

type Props = {
  orders: Order[] | undefined;
};

export const OrdersStatus = ({ orders }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        {t.adminPanel}
      </h1>
      <p className="text-muted-foreground mt-0.5 text-sm">
        {orders?.length} {t.filterAll.toLowerCase()} ·{' '}
        {orders?.filter((o) => o.status === 'pending').length}{' '}
        {t.pending.toLowerCase()}
      </p>
    </div>
  );
};
