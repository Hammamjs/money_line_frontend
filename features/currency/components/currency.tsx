import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

import { CurrencyReponse } from '../types/currency.types';

type Props = {
  c: CurrencyReponse;
  i: number;

  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const Currency = ({ c, handleDelete, handleToggle, i }: Props) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
    >
      <div
        className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
          c.isActive
            ? 'border-primary/40 bg-primary/5'
            : 'border-border/40 bg-muted/10 opacity-60'
        }`}
      >
        <span className="text-2xl">{c.code}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{c.name}</span>
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              {c.symbol}
            </code>
            {c.isActive ? (
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
          <p className="text-xs text-muted-foreground mt-0.5">
            {format(c.createdAt, 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggle(c.id, c.isActive)}
            className="gap-1 text-xs h-7 px-2"
          >
            {c.isActive ? (
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
            onClick={() => handleDelete(c.id)}
            className="h-7 w-7 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
