import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Landmark,
  Smartphone,
  Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAdminsAccountsQuery } from '@/features/accounts/api';
import { Account } from '@/features/accounts/types';
import { TCreateOrderSchema } from '@/features/orders/schema';
import { useTranslation } from '@/lib/i18n';

import { CurrencyReponse } from '../types/currency.types';
import { AccountDetails } from '@/features/accounts/components';

type Props = {
  selectedAccountId: string;
  selectedAccount: Account | undefined;
  copiedField: string | null;
  fromCurrency: CurrencyReponse | undefined;
  toCurrency: CurrencyReponse | undefined;
  currencies: CurrencyReponse[] | undefined;
  convertedAmount: string;

  form: UseFormReturn<TCreateOrderSchema>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
  setManualFromCurrency: React.Dispatch<
    React.SetStateAction<CurrencyReponse | null>
  >;
  setManualToCurrency: React.Dispatch<
    React.SetStateAction<CurrencyReponse | null>
  >;
  copyToClipboard: (text: string, field: string) => void;
  setSelectedAccountId: React.Dispatch<React.SetStateAction<string>>;
};

function methodIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('vodafone')) return Smartphone;
  if (l.includes('eu') || l.includes('iban')) return Building2;
  return Landmark;
}

export const FirstStep = ({
  selectedAccountId,
  setSelectedAccountId,
  selectedAccount,
  copiedField,
  copyToClipboard,
  fromCurrency,
  setManualFromCurrency,
  setManualToCurrency,
  toCurrency,
  form,
  setStep,
  currencies,
  convertedAmount,
}: Props) => {
  const { t } = useTranslation();

  const { data } = useGetAdminsAccountsQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [selectedAdminEmail, setSelectedAdminEmail] = useState(
    data?.[0]?.email ?? '',
  );

  const selectedAdmin =
    data?.find((admin) => admin.email === selectedAdminEmail) ?? data?.[0];

  const isDisabled =
    !fromCurrency?.id || !toCurrency?.id || fromCurrency?.id === toCurrency?.id;

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5 text-primary" /> {t.paymentMethod}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Payment method cards */}

          <div className="space-y-6">
            {/* Admin Selector */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Choose payment recipient
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {data?.map((admin) => {
                  const active = selectedAdmin?.email === admin.email;

                  return (
                    <button
                      key={admin.email}
                      type="button"
                      onClick={() => setSelectedAdminEmail(admin.email)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        active
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/40 hover:bg-muted/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{admin.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {admin.email}
                          </p>
                        </div>

                        {active && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground">
                        {admin.accounts.length} payment method
                        {admin.accounts.length !== 1 && 's'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accounts */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Select payment method
              </h3>

              <div className="grid gap-3">
                {selectedAdmin?.accounts.map((acc) => {
                  const Icon = methodIcon(acc.label);
                  const selected = selectedAccountId === acc.id;

                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setSelectedAccountId(acc.id)}
                      className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                        selected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border hover:bg-muted/40'
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 ${
                          selected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 text-left">
                        <p className="font-medium">{acc.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {acc.bankName}
                        </p>
                        {acc.extraInfo && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {acc.extraInfo}
                          </p>
                        )}
                      </div>

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          selected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Account details display */}
          <AccountDetails
            selectedAccount={selectedAccount}
            copiedField={copiedField}
            copyToClipboard={copyToClipboard}
          />

          {/* Currency + amount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t.fromCurrency}
              </label>
              <select
                value={fromCurrency?.code}
                onChange={(e) => {
                  const from = currencies?.find(
                    (c) => c.code === e.target.value,
                  );
                  console.log(from);
                  if (from) {
                    setManualFromCurrency(from);
                  }
                }}
                className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {currencies?.map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t.toCurrency}
              </label>
              <select
                value={toCurrency?.code}
                onChange={(e) => {
                  const to = currencies?.find((c) => c.code === e.target.value);
                  console.log(to);
                  if (to) {
                    setManualToCurrency(to);
                  }
                }}
                className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {currencies?.map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t.youSend} ({fromCurrency?.code})
              </label>
              <Input
                type="number"
                {...form.register('amount')}
                className="font-bold text-lg"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t.youGet} ({toCurrency?.code})
              </label>
              <Input
                value={`${convertedAmount} ${toCurrency?.flag}`}
                readOnly
                className="font-bold text-lg bg-muted/40"
              />
            </div>
          </div>

          <Button
            className="w-full h-11"
            disabled={isDisabled}
            onClick={() => {
              if (!selectedAccount) {
                toast.error('Please select account first');
                return;
              }
              setStep(2);
            }}
          >
            {t.iveSent} <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
