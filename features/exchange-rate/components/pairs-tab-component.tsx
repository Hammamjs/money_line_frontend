import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AddExchangeRateForm } from './add-exchange-rate-form';
import { TrendingUp } from 'lucide-react';
import { PairsList } from './pairs-list';
import { useExchangeRateUi } from '../hooks/use-exchange-rate-ui';
import { useExchangeRateActions } from '../hooks/use-exchange-rate';

export function PairsTab() {
  const formUi = useExchangeRateUi();

  const {
    handleAdd,
    handleDelete,
    handleToggle,
    isDeletingPairs,
    isPairsAdding,
    isUpdating,
  } = useExchangeRateActions(formUi);

  const { currencies, form, fromId, pairs, toId } = formUi;

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Exchange Pairs
          </CardTitle>
        </CardHeader>
        <PairsList
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          pairs={pairs}
          isDeleting={isDeletingPairs}
          isUpdating={isUpdating}
        />
      </Card>

      <AddExchangeRateForm
        currencies={currencies}
        form={form}
        fromId={fromId}
        handleAdd={handleAdd}
        toId={toId}
        isAdding={isPairsAdding}
      />
    </div>
  );
}
