import { Currency } from '@/features/currency/types/currency.types';

export const getFlag = (
  currencies: Currency[] | undefined,
  id: string,
): string => currencies?.find((c) => c.id === id)?.flag || 'unknown';
