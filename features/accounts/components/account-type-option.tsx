import { AccountType } from '@/features/accounts/types';
import { useTranslation } from '@/lib/i18n';
import React from 'react';

type Props = {
  newType: AccountType;

  setNewType: React.Dispatch<React.SetStateAction<AccountType>>;
};

export const AccountTypeOption = ({ newType, setNewType }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      {(['Bank', 'Wallet'] as AccountType[]).map((type) => (
        <button
          key={type}
          onClick={() => setNewType(type)}
          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
            newType === type
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-border hover:bg-muted/50'
          }`}
        >
          {type === 'Bank' ? t.bankType : t.walletType}
        </button>
      ))}
    </div>
  );
};
