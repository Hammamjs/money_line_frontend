import { useUpdateCurrencyMutation } from '../api/currency-slice.api';

export const useUpdateCurrency = () => {
  const [action, result] = useUpdateCurrencyMutation();

  const updateCurrency = async (
    id: string,
    { isActive }: { isActive: boolean },
  ) => {
    return action({ id, isActive }).unwrap();
  };

  return {
    updateCurrency,
    ...result,
  };
};
