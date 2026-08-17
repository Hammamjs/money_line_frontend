import { format } from 'date-fns';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { Order } from '../types';
import { useTranslation } from '@/lib/i18n';

export function StatusTimeline({ order }: { order: Order }) {
  const { t } = useTranslation();
  const steps = [
    {
      key: 'pending',
      label: t.pending,
      desc: 'Transfer submitted',
      icon: Clock,
      done: true,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      key: 'processing',
      label: t.processing,
      desc: 'Admin reviewing transfer',
      icon: Loader2,
      done: order.status === 'pending' || order.status === 'success',
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      key: 'complete',
      label: t.complete,
      desc: 'Funds sent to recipient',
      icon: CheckCircle2,
      done: order.status === 'success',
      color: 'text-green-500 bg-green-500/10',
    },
  ];
  return (
    <div className="relative space-y-0">
      {steps.map((step, i) => (
        <div
          key={step.key}
          className="flex items-start gap-4 pb-5 last:pb-0 relative"
        >
          {/* Vertical line */}
          {i < steps.length - 1 && (
            <div
              className={`absolute left-4.25 top-9 w-0.5 h-full max-h-8 ${step.done ? 'bg-primary/40' : 'bg-border'}`}
            />
          )}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step.done ? step.color : 'bg-muted text-muted-foreground'
            }`}
          >
            <step.icon
              className={`w-4 h-4 ${step.done && step.key === 'processing' ? 'animate-spin' : ''}`}
            />
          </div>
          <div className="flex-1 pt-1.5">
            <p
              className={`text-sm font-semibold ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
            {step.key === 'complete' && order.updatedAt && (
              <p className="text-xs text-green-600 mt-0.5">
                {format(new Date(order.updatedAt), 'MMM d, yyyy · HH:mm')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
