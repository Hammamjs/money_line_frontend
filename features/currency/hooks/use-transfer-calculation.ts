import { useEffect, useMemo } from 'react';
import { CurrencyReponse } from '../types/currency.types';
import { Account } from '@/features/accounts/types';
import { useGetExchageRateQuery } from '@/features/exchange-rate/hooks';

type Props = {
  amount: string;
  fromCurrency: CurrencyReponse | undefined;
  toCurrency: CurrencyReponse | undefined;
  accounts: Account[] | undefined;
  selectedAccountId: string;
};

export const useTransferCalculation = ({
  amount,
  accounts,
  fromCurrency,
  selectedAccountId,
  toCurrency,
}: Props) => {
  const {
    data: exchangeRate,
    isError,
    error,
  } = useGetExchageRateQuery(fromCurrency?.id, toCurrency?.id);

  useEffect(() => {
    console.log(exchangeRate);
    if (isError) console.log(error);
  }, [exchangeRate, isError, error]);

  console.log(exchangeRate);

  const convertedAmount = useMemo(
    () => (+amount * (exchangeRate?.rate || 0)).toString(),
    [amount, exchangeRate],
  );

  const selectedAccount = accounts?.find((a) => a.id === selectedAccountId);

  return {
    exchangeRate,
    selectedAccount,
    convertedAmount,
  };
};
