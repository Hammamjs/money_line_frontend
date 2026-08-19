import { useForm, useWatch } from 'react-hook-form';
import {
  EXCHANGE_RATE_DEFAULT_VALUES,
  exchangeRateSchema,
} from '../schema/exchange-rate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCurrenciesQuery } from '@/features/currency/api/currency-slice.api';
import { useGetAllExchangeRateQuery } from '../api/exchange-rate-slice.api';

export const useExchangeRateUi = () => {
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: pairs } = useGetAllExchangeRateQuery();

  const form = useForm({
    resolver: zodResolver(exchangeRateSchema),
    mode: 'onChange',
    defaultValues: EXCHANGE_RATE_DEFAULT_VALUES,
  });

  const [rate, fromId, toId] = useWatch({
    control: form.control,
    name: ['rate', 'fromId', 'toId'],
  });

  return {
    form,
    currencies,
    pairs,
    rate,
    fromId,
    toId,
  };
};
