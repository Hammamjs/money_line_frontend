import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { Hash, Receipt } from 'lucide-react';
import { StatusTimeline } from './status-timeline';
import { format } from 'date-fns';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import { Order } from '../types';

export function OrderDetailModal({
  order,
  open,
  onClose,
}: {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Transfer Receipt
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          {/* Status timeline */}
          <StatusTimeline order={order} />

          <div className="border-t pt-4 space-y-2.5">
            {[
              {
                label: t.amount + ' (SDG)',
                value: order.fromCurrency.name.toLocaleString(),
              },
              {
                label: t.youGet,
                value: `${order.amount} ${order.fromCurrency.name} ${order.fromCurrency.flag}`,
              },
              { label: t.phoneNum, value: order.phone },
              {
                label: t.date,
                value: format(new Date(order.createdAt), 'PPP · HH:mm'),
              },
              {
                label: (
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" /> ID
                  </span>
                ),
                value: (
                  <code className="text-xs">{order.id.slice(0, 16)}…</code>
                ),
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <span className="text-muted-foreground shrink-0">
                  {row.label}
                </span>
                <span className="font-medium text-right">{row.value}</span>
              </div>
            ))}
          </div>

          {order.transactionProof && (
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Receipt className="w-3 h-3" /> Transfer Receipt
              </p>
              <Image
                src={order.transactionProof}
                fill
                alt="Proof"
                className="w-full max-h-48 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
