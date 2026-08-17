import { toast } from 'sonner';
import { useAddCUrrencyMutationAction } from './use-add-currency';
import { useUpdateCurrency } from './use-update-currency';
import { useDeleteCurrencyMutationAction } from './use-delete-currency';
import {
  CURRENCY_DEFAULT_VALUES,
  TCurrencySchema,
} from '../schema/currency.schema';
import { UseFormReturn } from 'react-hook-form';

type UseCurrenciesActionsProps = {
  name: string;
  symbol: string;
  code: string;
  flag: string;
  form: UseFormReturn<TCurrencySchema>;
};

export const useCurrenciesActions = ({
  name,
  symbol,
  form,
  code,
  flag,
}: UseCurrenciesActionsProps) => {
  const { addCurrency, isLoading: isAdding } = useAddCUrrencyMutationAction();
  const { updateCurrency, isLoading: isUpdating } = useUpdateCurrency();
  const { deleteCurrency, isLoading: isDeleting } =
    useDeleteCurrencyMutationAction();

  const handleAdd = async () => {
    console.log('handle Added triggered');
    try {
      await addCurrency({ name, symbol, code, flag });
      form.reset(CURRENCY_DEFAULT_VALUES);
      toast.success('Currency added');
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (id: string, isActive: boolean) => {
    updateCurrency(id, { isActive: !isActive });
    toast.success(isActive ? 'Currency deactivated' : 'Currency activated');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCurrency({ id });
      toast.success('Currency deleted');
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleAdd,
    handleToggle,
    isUpdating,
    isAdding,
    handleDelete,
    isDeleting,
  };
};
