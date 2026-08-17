import React, { useCallback } from 'react';
import { CurrencyReponse } from '@/features/currency/types/currency.types';

type CurrencyExchangeProps = {
  setToAmount: React.Dispatch<React.SetStateAction<string>>;
  toAmount: string;
  fromCurrency: CurrencyReponse | null;
  setFromCurrency: React.Dispatch<React.SetStateAction<CurrencyReponse | null>>;
  toCurrency: CurrencyReponse | null;
  setToCurrency: React.Dispatch<React.SetStateAction<CurrencyReponse | null>>;
  setFromAmount: React.Dispatch<React.SetStateAction<string>>;
  setLastEdited: React.Dispatch<React.SetStateAction<'from' | 'to'>>;
};

export const useCurrencyExchangeAction = ({
  setToAmount,
  toAmount,
  fromCurrency,
  setFromCurrency,
  setToCurrency,
  toCurrency,
  setFromAmount,
  setLastEdited,
}: CurrencyExchangeProps) => {
  const handleToChange = useCallback((v: string) => {
    setLastEdited('to');
    setToAmount(v);
  }, []);

  console.log(fromCurrency);

  const handleFromChange = useCallback((v: string) => {
    setLastEdited('from');
    setFromAmount(v);
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setLastEdited('from');
  };

  const handleFromCurrencyChange = (c: CurrencyReponse) => {
    if (c.id === toCurrency?.id) setToCurrency(fromCurrency);
    console.log('Should change to ', c);
    setFromCurrency(c);
    setLastEdited('from');
  };

  const handleToCurrencyChange = (c: CurrencyReponse) => {
    if (c.id === fromCurrency?.id) setFromCurrency(toCurrency);
    setToCurrency(c);
    setLastEdited('from');
  };

  return {
    handleFromChange,
    handleFromCurrencyChange,
    handleSwap,
    handleToCurrencyChange,
    handleToChange,
  };
};
