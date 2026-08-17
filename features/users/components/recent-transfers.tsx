import Link from 'next/link';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/features/orders/types';

import { StatusBadge } from './status-badge';
import { useTranslation } from '@/lib/i18n';

type Props = {
  orders: Order[] | undefined;
};

export const RecentTransfers = ({ orders }: Props) => {
  const { t } = useTranslation();
  const ordersLength = orders?.length || 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
    >
      <Card className="border-border/50">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-primary" />{' '}
            {t.recentTransfers}
          </CardTitle>
          {ordersLength > 3 && (
            <Link href="/orders">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary"
              >
                {t.myOrders} →
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {ordersLength === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ArrowRightLeft className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">{t.noOrders}</p>
              <Link href="/transfer">
                <Button size="sm" variant="outline" className="mt-3">
                  {t.startTransfer}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {orders?.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-2xl shrink-0">
                    {order.fromCurrency.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">
                        {order.toCurrency.toLocaleString()} SDG
                      </span>
                      <span className="text-muted-foreground text-xs">→</span>
                      <span className="font-semibold text-sm text-primary">
                        {order.amount} {order.toCurrency.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {format(new Date(order.createdAt), 'MMM d, yyyy · HH:mm')}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
