import { useAddExchangeRateMutation } from '../api/exchange-rate-slice.api';
import { type AddExchangeRateQuery } from '../types/exchange-rate.types';

export const useAddExchangeRateMutationAction = () => {
  const [action, result] = useAddExchangeRateMutation();

  const addPairs = async (data: AddExchangeRateQuery) => {
    return action(data).unwrap();
  };

  return {
    addPairs,
    ...result,
  };
};
