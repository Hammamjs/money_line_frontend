import { useForm, useWatch } from 'react-hook-form';
import {
  CURRENCY_DEFAULT_VALUES,
  CurrencySchema,
  TCurrencySchema,
} from '../schema/currency.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCurrenciesQuery } from '../api/currency-slice.api';

export const useCurrenciesTabUi = () => {
  const form = useForm<TCurrencySchema>({
    resolver: zodResolver(CurrencySchema),
    mode: 'onChange',
    defaultValues: CURRENCY_DEFAULT_VALUES,
  });

  const [name, code, flag, symbol] = useWatch({
    control: form.control,
    name: ['name', 'code', 'flag', 'symbol'],
  });

  const { data: currencies } = useGetCurrenciesQuery();

  return {
    form,
    name,
    code,
    flag,
    symbol,

    currencies,
  };
};
