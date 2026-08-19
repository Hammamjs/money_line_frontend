import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

export const EmptyFilters = ({ filter }: { filter: string }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-24 bg-background rounded-xl border border-dashed">
      <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <ArrowRightLeft className="w-10 h-10 text-primary/30" />
      </div>
      <h3 className="text-xl font-medium mb-2">{t.noOrders}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
        {filter === 'all'
          ? "You haven't made any transfers."
          : `No ${filter} transfers.`}
      </p>
      <Link href="/transfer">
        <Button>{t.startTransfer}</Button>
      </Link>
    </div>
  );
};
