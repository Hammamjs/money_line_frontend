import { ArrowRight, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

import { ExchangeRateResult } from '../types/exchange-rate.types';

type Props = {
  i: number;
  p: ExchangeRateResult;
  isDeleting: boolean;
  isUpdating: boolean;
  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const ExchangeRatePair = ({
  i,
  p,
  handleDelete,
  handleToggle,
  isDeleting,
  isUpdating,
}: Props) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
    >
      <div
        className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
          p.isActive
            ? 'border-primary/40 bg-primary/5'
            : 'border-border/40 bg-muted/10 opacity-60'
        }`}
      >
        {/* From → To */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-lg">{p.fromCurrency.flag}</span>
          <span className="text-xs font-bold text-muted-foreground">
            {p.fromCurrency.symbol}
          </span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-lg">{p.toCurrency.flag}</span>
          <span className="text-xs font-bold text-muted-foreground">
            {p.toCurrency.flag}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-bold text-sm text-primary">
              1 {p.fromCurrency.symbol} ={' '}
              {p.rate < 0.01
                ? Number(p.rate).toFixed(3)
                : Number(p.rate).toFixed(3)}{' '}
              {p.toCurrency.symbol}
            </span>
            {p.isActive ? (
              <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-200">
                {t.active}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-[10px] text-muted-foreground"
              >
                Inactive
              </Badge>
            )}
          </div>
          {/* {p.label && (
            <p className="text-xs text-muted-foreground mt-0.5">{p.label}</p>
          )} */}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            disabled={isUpdating}
            onClick={() => handleToggle(p.id, p.isActive)}
            className="gap-1 text-xs h-7 px-2"
          >
            {p.isActive ? (
              <>
                <ToggleRight className="w-4 h-4 text-primary" /> Deactivate
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4" /> Activate
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={isDeleting}
            onClick={() => handleDelete(p.id)}
            className="h-7 w-7 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
