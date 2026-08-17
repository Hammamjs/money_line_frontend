import { Badge } from '@/components/ui/badge';
import { Account } from '../types';
import { useTranslation } from '@/lib/i18n';
import { Building2, Wallet } from 'lucide-react';

export const BankAccountInfo = ({ acc }: { acc: Account }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        {acc.type === 'Wallet' ? (
          <Wallet className="w-4 h-4 text-primary" />
        ) : (
          <Building2 className="w-4 h-4 text-primary" />
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm">{acc.label}</p>
          <Badge
            className={
              acc.isActive
                ? 'bg-green-500/10 text-green-600 border-green-200 text-[10px]'
                : 'bg-muted text-muted-foreground text-[10px]'
            }
          >
            {acc.isActive ? t.active : t.inactive}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {acc.bankName} · {acc.accountNumber}
        </p>
        {acc.iban && (
          <p className="text-xs font-mono text-muted-foreground">
            IBAN: {acc.iban}
          </p>
        )}
      </div>
    </div>
  );
};
