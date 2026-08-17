import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import { StatusBadge } from './status-badge';
import { Order as OrdersType } from '../types/orders.types';
import { format } from 'date-fns';
import React from 'react';

type Props = {
  order: OrdersType;
  i: number;
  setSelected: React.Dispatch<React.SetStateAction<OrdersType | null>>;
};

export const Order = ({ setSelected, order, i }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
    >
      <Card
        className="overflow-hidden border-border/50 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setSelected(order)}
      >
        <CardContent className="p-0">
          <div className="flex items-center p-4 gap-4">
            {/* Flag */}
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0 shadow-sm">
              {order?.toCurrency.flag}
            </div>

            {/* Amounts */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold">
                  {order?.amount.toLocaleString()} {order.fromCurrency.flag}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground rtl:rotate-180 shrink-0" />
                <span className="font-bold text-primary">
                  {order?.amount} {order?.toCurrency.flag}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {format(order?.createdAt || new Date(), 'MMM d, yyyy')}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  #{order?.id.slice(0, 8)}
                </span>
              </div>
            </div>

            {/* Status + eye */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <StatusBadge status={order?.status || 'pending'} />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" /> View
              </span>
            </div>
          </div>

          {/* Status bar */}
          <div
            className={`h-1 w-full ${
              order?.status === 'success'
                ? 'bg-green-500'
                : order?.status === 'pending'
                  ? 'bg-blue-400'
                  : 'bg-amber-400'
            }`}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
