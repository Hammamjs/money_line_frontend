import { ExchangeRateResult } from '../types/exchange-rate.types';
import { ExchangeRatePair } from './exchange-rate-pair';

type Props = {
  pairs: ExchangeRateResult[] | undefined;
  isDeleting: boolean;
  isUpdating: boolean;
  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const ExchangeRate = ({
  pairs,
  handleDelete,
  handleToggle,
  isDeleting,
  isUpdating,
}: Props) => {
  return (
    <div className="space-y-2">
      {pairs?.map((p, i) => (
        <ExchangeRatePair
          i={i}
          p={p}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          key={p.id}
        />
      ))}
    </div>
  );
};
