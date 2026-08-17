'use client';
import { useEffect } from 'react';

import { useGetExchageRateQuery } from '@/features/exchange-rate/hooks';
import { useCurrencyExchangeAction } from '../hooks/use-currency-exchange-action';
import { useConverterEffect } from '../hooks/use-converter-effect';
import { useHandleTransfer } from '../hooks/use-handle-transfer';
import Converter from './converter';
import { useConverterUi } from '../hooks/use-converter-ui';
import HowItWorks from './how-it-works';

export default function Landing() {
  const {
    currencies,
    fromAmount,
    lastEdited,
    selectedFromCurency,
    selectedToCurency,
    setFromAmount,
    setFromCurrency,
    setLastEdited,
    setToAmount,
    setToCurrency,
    toAmount,
  } = useConverterUi();

  const { data, isLoading, isError } = useGetExchageRateQuery(
    selectedFromCurency?.id,
    selectedToCurency?.id,
  );

  const {
    handleFromChange,
    handleFromCurrencyChange,
    handleSwap,
    handleToChange,
    handleToCurrencyChange,
  } = useCurrencyExchangeAction({
    fromCurrency: selectedFromCurency,
    toCurrency: selectedToCurency,
    toAmount,
    setFromCurrency,
    setToCurrency,
    setFromAmount,
    setToAmount,
    setLastEdited,
  });

  useConverterEffect({
    fromAmount,
    toAmount,
    fromCurrency: selectedFromCurency,
    toCurrency: selectedToCurency,
    lastEdited,
    setFromAmount,
    setToAmount,
    rate: data?.rate || 0,
  });

  const { handleTransfer } = useHandleTransfer({
    fromAmount,
    toCurrency: selectedToCurency,
    fromCurrency: selectedFromCurency,
  });

  useEffect(() => {
    console.log('FROM ID:', selectedFromCurency?.id);
    console.log('TO ID:', selectedToCurency?.id);
    console.log('DATA:', data);
  }, [selectedFromCurency, selectedToCurency, data]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Fast & Simple Currency Exchange
            </div>

            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <span className="text-lg font-black">$</span>
              </div>

              <span className="text-2xl font-black tracking-tight">
                Money<span className="text-primary">Line</span>
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Exchange money.
              <br />
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Simply & confidently.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Convert currencies quickly with live exchange rates and a simple,
              secure experience built for everyday transfers.
            </p>
          </div>

          <Converter
            fromAmount={fromAmount}
            fromCurrency={selectedFromCurency}
            data={data}
            toAmount={toAmount}
            toCurrency={selectedToCurency}
            currencies={currencies}
            handleFromCurrencyChange={handleFromCurrencyChange}
            handleToChange={handleToChange}
            handleSwap={handleSwap}
            handleToCurrencyChange={handleToCurrencyChange}
            handleFromChange={handleFromChange}
            handleTransfer={handleTransfer}
            isRateError={isError}
            isRateLoading={isLoading}
          />

          <HowItWorks />
        </div>
      </section>
    </main>
  );
}
