import { Currency } from '@/features/currency/types/currency.types';
import { convert } from '@/lib/exchange';
import React, { useEffect } from 'react';

type ConverterState = {
  lastEdited: 'from' | 'to';
  fromAmount: string;
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  toAmount: string;

  rate: number;

  setToAmount: React.Dispatch<React.SetStateAction<string>>;
  setFromAmount: React.Dispatch<React.SetStateAction<string>>;
};

export const useConverterEffect = ({
  fromAmount,
  fromCurrency,
  lastEdited,
  toCurrency,
  toAmount,
  setToAmount,
  setFromAmount,
  rate,
}: ConverterState) => {
  useEffect(() => {
    console.log(rate);
    if (!rate) return;

    if (fromCurrency === null || toCurrency === null) return;

    if (lastEdited === 'from') {
      const n = parseFloat(fromAmount) || 0;
      setToAmount(
        convert(n, fromCurrency?.code, toCurrency?.code, rate).toFixed(2),
      );
    } else {
      const n = parseFloat(toAmount) || 0;
      setFromAmount(
        convert(n, toCurrency?.code, fromCurrency?.code, rate).toFixed(2),
      );
    }
  }, [
    rate,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    lastEdited,
    setToAmount,
    setFromAmount,
  ]);
};
