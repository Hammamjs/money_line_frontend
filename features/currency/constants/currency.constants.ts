import { TranslationsType } from '@/lib/translations';
import { CheckSquare, UserIcon, Wallet } from 'lucide-react';

export const getStep = (t: TranslationsType) => [
  { num: 1, title: t.accountDetails, icon: Wallet },
  { num: 2, title: t.yourInfo, icon: UserIcon },
  { num: 3, title: t.confirmSend, icon: CheckSquare },
];

export const currenciesKey = {
  type: 'Currencies' as const,
  details: (id: string) => ({ type: currenciesKey.type, id }) as const,
  list: () => ({ type: currenciesKey.type, id: 'LIST' }) as const,
} as const;
