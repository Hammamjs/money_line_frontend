import { useDeleteExchangeRateMutation } from '../api/exchange-rate-slice.api';

export const useDeleteExchangeRateMutationAction = () => {
  const [action, result] = useDeleteExchangeRateMutation();

  const deletePairs = async ({ id }: { id: string }) => {
    return action({ id }).unwrap();
  };

  return {
    deletePairs,
    ...result,
  };
};
