import { CurrencyReponse } from '@/features/currency/types/currency.types';

export const getFlag = (
  currencies: CurrencyReponse[] | undefined,
  id: string,
): string => currencies?.find((c) => c.id === id)?.flag || 'unknown';
