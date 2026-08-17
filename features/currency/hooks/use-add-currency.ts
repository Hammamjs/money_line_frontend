import { useAddCurrencyMutation } from '../api/currency-slice.api';
import { CurrencyQuery } from '../types/currency.types';

export const useAddCUrrencyMutationAction = () => {
  const [action, result] = useAddCurrencyMutation();

  const addCurrency = async (data: CurrencyQuery) => {
    return action(data).unwrap();
  };

  return {
    addCurrency,
    ...result,
  };
};
