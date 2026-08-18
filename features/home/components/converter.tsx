import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Currency } from '@/features/currency/types';
import { ExchangeRateResult } from '@/features/exchange-rate/types';
import { rateLabel } from '@/lib/exchange';
import { useTranslation } from '@/lib/i18n';
import CurrencySelect from './currency-select';
import { Button } from '@/components/ui/button';

type Props = {
  fromAmount: string;
  fromCurrency: Currency | null;
  data: ExchangeRateResult | undefined;
  isRateLoading: boolean;
  isRateError: boolean;
  toAmount: string;
  toCurrency: Currency | null;
  currencies: Currency[] | undefined;
  handleFromCurrencyChange: (c: Currency) => void;
  handleToChange: (c: string) => void;
  handleSwap: () => void;
  handleToCurrencyChange: (c: Currency) => void;
  handleFromChange: (c: string) => void;
  handleTransfer: () => void;
};

const Converter = ({
  fromAmount,
  handleFromChange,
  fromCurrency,
  handleFromCurrencyChange,
  handleSwap,
  toAmount,
  toCurrency,
  handleToChange,
  handleToCurrencyChange,
  currencies,
  data,
  handleTransfer,
  isRateError,
  isRateLoading,
}: Props) => {
  const { t } = useTranslation();

  return (
    <section className="relative z-20  px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <Card className="shadow-2xl border border-border bg-card overflow-hidden">
          <div className="bg-primary/10 border-b border-border px-5 py-3 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">{t.converter}</h3>
          </div>

          <CardContent className="p-5 space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t.youSend}
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => handleFromChange(e.target.value)}
                  className="h-9 text-base font-bold bg-secondary border-border focus-visible:ring-primary flex-1 min-w-0"
                  placeholder="0"
                />
                <div className="w-28 shrink-0">
                  <CurrencySelect
                    value={fromCurrency}
                    currencies={currencies}
                    onChange={handleFromCurrencyChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-border" />
              <button
                onClick={handleSwap}
                className="p-1.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                title="Swap"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* TO row */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t.youGet}
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  value={Number(toAmount).toLocaleString('en-US')}
                  onChange={(e) => handleToChange(e.target.value)}
                  className="h-9 text-base font-bold bg-primary/5 border-primary/30 text-primary focus-visible:ring-primary flex-1 min-w-0"
                  placeholder="0"
                />
                <div className="w-28 shrink-0">
                  <CurrencySelect
                    value={toCurrency}
                    currencies={currencies}
                    onChange={handleToCurrencyChange}
                  />
                </div>
              </div>
              {fromCurrency && toCurrency && (
                <div className="text-right rtl:text-left">
                  {isRateLoading ? (
                    <p className="text-[11px] text-muted-foreground">
                      Loading exchange rate...
                    </p>
                  ) : isRateError ? (
                    <p className="text-[11px] text-destructive">
                      Unable to get exchange rate. Please try again.
                    </p>
                  ) : data?.rate ? (
                    <p className="text-[11px] text-muted-foreground">
                      {rateLabel(fromCurrency.code, toCurrency.code, data.rate)}
                    </p>
                  ) : (
                    <p className="text-[11px] text-destructive">
                      Exchange rate unavailable for this currency pair.
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              className="w-full h-10 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md flex justify-center items-center gap-2"
              onClick={handleTransfer}
            >
              {t.transferNow}{' '}
              <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Converter;
