import { Button } from '@/components/ui/button';
import { Account } from '@/features/accounts/types';
import { useTranslation } from '@/lib/i18n';
import { ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { useAccountActions } from '../hooks/use-accounts-actions';

type Props = {
  acc: Account;
};

export const BankAccountActions = ({ acc }: Props) => {
  const { t } = useTranslation();
  const { handleDelete, handleToggle } = useAccountActions();
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleToggle(acc.id, acc.isActive)}
        className="text-muted-foreground hover:text-foreground gap-1"
      >
        {acc.isActive ? (
          <ToggleRight className="w-4 h-4 text-primary" />
        ) : (
          <ToggleLeft className="w-4 h-4" />
        )}
        <span className="text-xs">
          {acc.isActive ? t.deactivate : t.activate}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleDelete(acc.id)}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
