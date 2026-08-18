import { useMemo } from 'react';
import { Currency } from '../types/currency.types';
import { Account } from '@/features/accounts/types';
import { useGetExchangeRateQuery } from '@/features/exchange-rate/hooks';

type Props = {
  amount: string;
  fromCurrency: Currency | undefined;
  toCurrency: Currency | undefined;
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
  const { data: exchangeRate } = useGetExchangeRateQuery(
    fromCurrency?.id,
    toCurrency?.id,
  );

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
