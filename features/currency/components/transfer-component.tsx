'use client';

import { useTranslation } from '@/lib/i18n';
import { AnimatePresence } from 'framer-motion';
import { Stepper } from './stepper';
import { FirstStep } from './first-step';
import { ThirdStep } from './third-step';
import { useTransferUi } from '../hooks/use-transfer-ui';
import { getStep } from '../constants/currency.constants';
import { useTransferActions } from '../hooks/use-transfer-actions';
import { useTransfer } from '../hooks/use-transfer';
import { useTransferQueryParam } from '../hooks/use-transfer-query-param';
import { useTransferCalculation } from '../hooks/use-transfer-calculation';
import { useGetAdminsAccountsQuery } from '@/features/accounts/api/accounts-slice.api';
import { SecondStep } from './second-step';
import { useGetCurrenciesQuery } from '../api/currency-slice.api';

export default function Transfer() {
  const { t } = useTranslation();

  const { data } = useGetAdminsAccountsQuery();

  const { initialAmount, initialFrom, initialTo } = useTransferQueryParam();

  const {
    step,
    selectedAccountId,
    setSelectedAccountId,
    copiedField,
    setCopiedField,
    setStep,
  } = useTransferUi();

  const { data: currencies } = useGetCurrenciesQuery();

  const {
    fromCurrency,
    setManualFromCurrency,
    setManualToCurrency,
    form,
    toCurrency,
    amount,
    setImagePreview,
    accountHolderName,
    paymentProvider,
    imagePreview,
    phone,
  } = useTransfer({ initialAmount, initialFrom, initialTo, currencies });

  const accounts = data?.flatMap((admin) => admin.accounts) ?? [];

  const { selectedAccount, convertedAmount } = useTransferCalculation({
    amount,
    accounts,
    fromCurrency,
    selectedAccountId,
    toCurrency,
  });

  const {
    copyToClipboard,
    handleConfirmAndSend,
    handleImageUpload,
    handleNextStep2,
    isOrderCreating,
  } = useTransferActions({
    convertedAmount,
    amount,
    fromCurrency,
    setImagePreview,
    selectedAccount,
    setCopiedField,
    setStep,
    toCurrency,
    phone,
    form,
  });

  const steps = getStep(t);

  return (
    <div className="min-h-screen bg-background from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">{t.transfer}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t.selectPaymentMethod}
          </p>
        </div>

        <Stepper step={step} steps={steps} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <FirstStep
              copiedField={copiedField}
              copyToClipboard={copyToClipboard}
              currencies={currencies}
              convertedAmount={convertedAmount}
              fromCurrency={fromCurrency}
              selectedAccount={selectedAccount}
              selectedAccountId={selectedAccountId}
              form={form}
              setManualFromCurrency={setManualFromCurrency}
              setSelectedAccountId={setSelectedAccountId}
              setStep={setStep}
              setManualToCurrency={setManualToCurrency}
              toCurrency={toCurrency}
            />
          )}

          {step === 2 && (
            <SecondStep
              handleImageUpload={handleImageUpload}
              handleNextStep2={handleNextStep2}
              imagePreview={imagePreview}
              setStep={setStep}
              form={form}
            />
          )}
          {/* ── Step 3 ── */}
          {step === 3 && (
            <ThirdStep
              amount={amount}
              fromCurrency={fromCurrency}
              convertedAmount={convertedAmount}
              handleConfirmAndSend={handleConfirmAndSend}
              phone={phone}
              imagePreview={imagePreview}
              selectedAccount={selectedAccount}
              setStep={setStep}
              toCurrency={toCurrency}
              form={form}
              paymentProvider={paymentProvider}
              accountHolderName={accountHolderName}
              isOrderCreating={isOrderCreating}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
