import { useDeleteCurrencyMutation } from '../api/currency-slice.api';

export const useDeleteCurrencyMutationAction = () => {
  const [action, result] = useDeleteCurrencyMutation();

  const deleteCurrency = async (id: { id: string }) => {
    return action(id).unwrap();
  };

  return {
    deleteCurrency,
    ...result,
  };
};
