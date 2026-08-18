import { UseFormReturn } from 'react-hook-form';
import { useAddExchangeRateMutationAction } from './use-add-exchange-rate';
import {
  EXCHANGE_RATE_DEFAULT_VALUES,
  TExchangeRateSchema,
} from '../schema/exchange-rate.schema';
import { toast } from 'sonner';
import { useDeleteExchangeRateMutationAction } from './use-delete-exchange-rate';
import { useUpdateExchangeRateMutationAction } from './use-update-exchange-rate-action';

type Props = {
  form: UseFormReturn<TExchangeRateSchema>;
  fromId: string;
  toId: string;
  rate: number;
};

export const useExchangeRateActions = ({ form, fromId, rate, toId }: Props) => {
  const { addPairs, isLoading: isPairsAdding } =
    useAddExchangeRateMutationAction();

  const { deletePairs, isLoading: isDeletingPairs } =
    useDeleteExchangeRateMutationAction();

  const { updatePairStatus, isLoading: isUpdating } =
    useUpdateExchangeRateMutationAction();

  const handleAdd = async () => {
    try {
      await addPairs({
        fromCurrencyId: fromId,
        toCurrencyId: toId,
        rate,
      });

      form.reset(EXCHANGE_RATE_DEFAULT_VALUES);
      toast.success('Pair added');
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      await updatePairStatus(id, { isActive: !isActive });
      toast.success(isActive ? 'Pair deactivated' : 'Pair activated');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePairs({ id });
      toast.success('Pair deleted');
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleAdd,
    isPairsAdding,
    handleDelete,
    isUpdating,
    isDeletingPairs,
    handleToggle,
  };
};
