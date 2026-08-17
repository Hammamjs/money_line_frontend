import { Account } from '@/features/accounts/types';
import { TranslationsType } from '@/lib/translations';

export const buildAccountFields = (
  account: Account | undefined,
  t: TranslationsType,
) => {
  if (!account) return [];

  return [
    {
      label: t.accountName,
      value: account.bankName,
      key: 'name',
    },
    {
      label: t.accountNum,
      value: account.accountNumber,
      key: 'num',
    },
    ...(account.iban
      ? [{ label: 'IBAN', value: account.iban, key: 'iban' }]
      : []),
    ...(account.bankName
      ? [{ label: t.bank, value: account.bankName, key: 'bank' }]
      : []),
  ];
};
