import React from 'react';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CheckCircle2, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { selectUser } from '@/features/auth/store';
import { Account } from '@/features/accounts/types';
import { TCreateOrderSchema } from '@/features/orders/schema';
import { useTranslation } from '@/lib/i18n';
import { CurrencyReponse } from '../types/currency.types';
import { Spinner } from '@/components/spinner';

type Props = {
  amount: string;
  fromCurrency: CurrencyReponse | undefined;
  toCurrency: CurrencyReponse | undefined;
  selectedAccount: Account | undefined;
  imagePreview: string | undefined;
  convertedAmount: string;
  isOrderCreating: boolean;

  phone: string;
  accountHolderName: string;
  paymentProvider: string;

  form: UseFormReturn<TCreateOrderSchema>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleConfirmAndSend: (data: TCreateOrderSchema) => void;
};

export const ThirdStep = ({
  amount,
  fromCurrency,
  handleConfirmAndSend,
  accountHolderName,
  paymentProvider,
  imagePreview,
  selectedAccount,
  setStep,
  toCurrency,
  phone,
  convertedAmount,
  form,
  isOrderCreating,
}: Props) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleConfirmAndSend)}
      >
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckSquare className="h-5 w-5 text-primary" /> {t.summary}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-black p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.youSend}</span>
                <span className="font-semibold">
                  {amount} {fromCurrency?.code} {fromCurrency?.flag}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.youGet}</span>
                <span className="font-semibold">
                  {convertedAmount} {toCurrency?.code} {toCurrency?.flag}
                </span>
              </div>
              {selectedAccount && (
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">{t.method}</span>
                  <span className="font-medium">
                    {selectedAccount.label + ' | ' + selectedAccount.type}{' '}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.email}</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.phoneNum}</span>
              <span>{phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t.accountHolderName}
              </span>
              <span>{accountHolderName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.paymentProvider}</span>
              <span>{paymentProvider}</span>
            </div>

            {imagePreview && (
              <div className="rounded-lg border p-3 flex items-center gap-3">
                <Image
                  src={imagePreview}
                  alt="proof"
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
                <div>
                  <div className="text-sm font-medium">{t.receiptUploaded}</div>
                  <div className="text-xs text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {t.verified}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                {t.back}
              </Button>
              <Button className="flex-1 h-11" type="submit">
                {isOrderCreating ? <Spinner /> : 'Create order'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  );
};
