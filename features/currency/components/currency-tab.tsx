import { CardContent } from '@/components/ui/card';
import { EmptyCurrency } from './empty-currency';
import { CurrenciesList } from './currencies-list';
import { Currency } from '../types';

type Props = {
  currencies: Currency[] | undefined;

  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const CurrencyTab = ({
  currencies,
  handleDelete,
  handleToggle,
}: Props) => {
  return (
    <CardContent>
      {currencies?.length === 0 ? (
        <EmptyCurrency />
      ) : (
        <div className="space-y-2">
          <CurrenciesList
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            currencies={currencies}
          />
        </div>
      )}
    </CardContent>
  );
};
