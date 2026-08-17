import { CardContent } from '@/components/ui/card';
import { ExchangeRate } from './exchange-rate';
import { ExchangeRateResult } from '../types/exchange-rate.types';

type Props = {
  pairs: ExchangeRateResult[] | undefined;
  isDeleting: boolean;
  isUpdating: boolean;
  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const PairsList = ({
  pairs,
  handleDelete,
  handleToggle,
  isDeleting,
  isUpdating,
}: Props) => {
  return (
    <CardContent>
      {pairs?.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No pairs configured yet.
        </p>
      ) : (
        <ExchangeRate
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          pairs={pairs}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      )}
    </CardContent>
  );
};
