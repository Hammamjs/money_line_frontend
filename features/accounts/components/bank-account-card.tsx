import { Card, CardContent } from '@/components/ui/card';
import { Account } from '@/features/accounts/types';
import { BankAccountActions } from './bank-account-action';
import { BankAccountInfo } from './bank-account-info';

type Props = {
  acc: Account;
};

export const BankAccountCard = ({ acc }: Props) => {
  return (
    <Card
      key={acc.id}
      className={`border ${acc.isActive ? 'border-primary/30' : 'border-border/40 opacity-60'}`}
    >
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <BankAccountInfo acc={acc} />
        <BankAccountActions acc={acc} />
      </CardContent>
    </Card>
  );
};
