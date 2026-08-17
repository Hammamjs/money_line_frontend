import { Coins } from 'lucide-react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { AddCurrencyForm } from './add-currency-form';
import { CurrencyTab } from './currency-tab';
import { useCurrenciesTabUi } from '../hooks/use-currencies-tab-ui';
import { useCurrenciesActions } from '../hooks/use-currencies.action';

export function CurrenciesTab() {
  const ui = useCurrenciesTabUi();

  const { handleAdd, handleDelete, handleToggle, isAdding } =
    useCurrenciesActions(ui);

  const { currencies, form } = ui;

  return (
    <div className="space-y-4">
      {/* List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" /> Currencies
          </CardTitle>
        </CardHeader>
        <CurrencyTab
          currencies={currencies}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      </Card>

      {/* Add form */}
      <AddCurrencyForm form={form} handleAdd={handleAdd} isAdding={isAdding} />
    </div>
  );
}
