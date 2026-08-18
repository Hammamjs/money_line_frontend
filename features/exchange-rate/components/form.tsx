import { UseFormReturn } from 'react-hook-form';
import { Plus } from 'lucide-react';

import { Currency } from '@/features/currency/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { TExchangeRateSchema } from '../schema';
import { getFlag } from '../utils/get-flag';

type Props = {
  form: UseFormReturn<TExchangeRateSchema>;
  currencies: Currency[] | undefined;
  fromId: string;
  toId: string;
  isAdding: boolean;
  handleAdd: () => void;
};

export const Form = ({
  form,
  currencies,
  fromId,
  toId,
  handleAdd,
  isAdding,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            From
          </label>
          <select
            {...form.register('fromId')}
            className="w-full h-9 rounded-md border border-border bg-background text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select…</option>
            {currencies?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.symbol} – {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            To
          </label>
          <select
            {...form.register('toId')}
            className="w-full h-9 rounded-md border border-border bg-background text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select…</option>
            {currencies
              ?.filter((c) => c.id !== fromId)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.symbol} – {c.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Rate (1 {getFlag(currencies, fromId) || ' FROM '} = ?{' '}
          {getFlag(currencies, toId) || ' TO '})
        </label>
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="e.g. 0.001800"
          {...form.register('rate', {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Label (optional)
        </label>
        <Input
          placeholder={
            fromId && toId ? `${fromId} → ${toId}` : 'e.g. Official Rate'
          }
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
      </div> */}

      <Button
        onClick={handleAdd}
        disabled={!form.formState.isValid || isAdding}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> Add Pair
      </Button>
    </>
  );
};
