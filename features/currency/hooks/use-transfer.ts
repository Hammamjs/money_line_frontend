import { useState } from 'react';
import { Currency } from '../types/currency.types';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateOrderSchema,
  DEFAULT_ORDER_VALUES,
  TCreateOrderSchema,
} from '@/features/orders/schema';

type Props = {
  initialAmount: string;
  initialFrom: string;
  initialTo: string;
  currencies: Currency[] | undefined;
};

export const useTransfer = ({
  initialAmount,
  initialFrom,
  initialTo,
  currencies,
}: Props) => {
  const [manualFromCurrency, setManualFromCurrency] = useState<Currency | null>(
    null,
  );
  const [manualToCurrency, setManualToCurrency] = useState<Currency | null>(
    null,
  );

  const defaultFormCurrency = currencies?.find((c) => c.code === initialFrom);
  const defaultToCurrency = currencies?.find((c) => c.code === initialTo);

  const fromCurrency = manualFromCurrency ?? defaultFormCurrency;
  const toCurrency = manualToCurrency ?? defaultToCurrency;

  const [imagePreview, setImagePreview] = useState<string>('');
  const form = useForm<TCreateOrderSchema>({
    resolver: zodResolver(CreateOrderSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...DEFAULT_ORDER_VALUES,
      amount: initialAmount,
    },
  });

  const [
    accountHolderName,
    amount,
    phone,
    extraInfo,
    paymentProvider,
    transactionProof,
  ] = useWatch({
    control: form.control,
    name: [
      'accountHolderName',
      'amount',
      'phone',
      'extraInfo',
      'paymentProvider',
      'transactionProof',
    ],
  });

  return {
    manualFromCurrency,
    setManualFromCurrency,
    manualToCurrency,
    setManualToCurrency,
    fromCurrency,
    toCurrency,
    form,
    accountHolderName,
    amount,
    phone,
    extraInfo,
    paymentProvider,
    transactionProof,
    imagePreview,
    setImagePreview,
  };
};
