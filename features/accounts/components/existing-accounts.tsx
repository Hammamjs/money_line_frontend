import { Account } from '../types';
import { BankAccountCard } from './bank-account-card';

type Props = {
  accounts: Account[] | undefined;
};

export const ExistingAccounts = ({ accounts }: Props) => {
  return accounts?.map((acc) => <BankAccountCard key={acc.id} acc={acc} />);
};
