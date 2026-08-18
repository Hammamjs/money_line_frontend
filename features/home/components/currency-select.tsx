import { ChevronDown } from 'lucide-react';
import { Currency } from '@/features/currency/types/currency.types';

function CurrencySelect({
  value,
  onChange,
  currencies,
}: {
  value: Currency | null;
  currencies?: Currency[];
  onChange: (c: Currency) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value?.code}
        onChange={(e) => {
          const selected = currencies?.find((c) => c.code === e.target.value);
          if (selected) {
            onChange(selected);
          }
        }}
        className="appearance-none w-full h-9 rounded-md border border-border bg-secondary text-foreground text-sm font-semibold pl-8 pr-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {currencies?.map((c) => (
          <option key={c?.id} value={c.code}>
            {c.code}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
    </div>
  );
}

export default CurrencySelect;
