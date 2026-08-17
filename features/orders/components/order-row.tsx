import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/features/orders/components';
import { Order, OrderStatus } from '@/features/orders/types';
import { format } from 'date-fns';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { useTranslation } from '@/lib/i18n';

type Props = {
  order: Order;
  handleStatusUpdate: (orderId: string, status: OrderStatus) => void;
};

export const OrderRow = ({ handleStatusUpdate, order }: Props) => {
  const { t } = useTranslation();

  return (
    <tr className="hover:bg-muted/20 transition-colors">
      <td className="px-6 py-4">
        <p className="font-semibold text-foreground">{order.user.username}</p>
        {order.user.email && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {order.user.email}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {/* {order.whatsapp} */}
        </p>
        <p className="text-[10px] font-mono text-muted-foreground mt-1">
          ID: {order.id.slice(0, 8)}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">
            {/* {order.fromCurrency === 'CAD' ? '🇨🇦' : '🇪🇬'} */}
          </span>
          <span className="font-bold">
            {/* {order.amount}  {order.amount} */}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {Number(order.amount).toLocaleString('en-Us')}
        </p>
      </td>
      <td className="px-6 py-4">
        <Dialog>
          <DialogTrigger asChild>
            <button className="relative group rounded-md overflow-hidden border cursor-pointer hover:border-primary transition-colors">
              <Image
                src={order.transactionProof}
                alt="Proof"
                width={100}
                height={100}
                className="w-16 h-12 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <Image
              src={order.transactionProof}
              alt="Proof Full"
              width={100}
              height={100}
              className="w-full h-auto rounded-md"
            />
          </DialogContent>
        </Dialog>
      </td>
      <td className="px-6 py-4">
        <div className="mb-2">
          <StatusBadge status={order.status} />
        </div>
        <p className="text-xs text-muted-foreground">
          {format(new Date(order.createdAt), 'MMM d, HH:mm')}
        </p>
      </td>
      <td className="px-6 py-4 text-right rtl:text-left">
        <div className="flex items-center justify-end rtl:justify-start gap-2">
          {order.status === 'pending' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusUpdate(order.id, 'pending')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              {t.markProcessing}
            </Button>
          )}
          {order.status !== 'success' && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate(order.id, 'success')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {t.markComplete}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};
