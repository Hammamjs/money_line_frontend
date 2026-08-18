import { useMemo, useState } from 'react';
import { useGetCurrenciesQuery } from '@/features/currency/api/currency-slice.api';
import { Currency } from '@/features/currency/types/currency.types';

export const useConverterUi = () => {
  const { data: currenciesData } = useGetCurrenciesQuery();

  const currencies = useMemo(
    () => currenciesData?.map((c) => ({ ...c })),
    [currenciesData],
  );

  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  const selectedFromCurrency = fromCurrency ?? currencies?.[0] ?? null;
  const selectedToCurrency = toCurrency ?? currencies?.[1] ?? null;

  const [fromAmount, setFromAmount] = useState('100000');
  const [toAmount, setToAmount] = useState('');

  const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from');

  return {
    currencies,
    currenciesData,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    selectedFromCurrency,
    selectedToCurrency,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    lastEdited,
    setLastEdited,
  };
};
