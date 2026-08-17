import { useAddExchangeRateMutation } from '../api/exchange-rate-slice.api';
import { AddExhangeRateQuery } from '../types/exchange-rate.types';

export const useAddExchangeRateMutationAction = () => {
  const [action, result] = useAddExchangeRateMutation();

  const addPairs = async (data: AddExhangeRateQuery) => {
    return action(data).unwrap();
  };

  return {
    addPairs,
    ...result,
  };
};
