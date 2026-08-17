import { useUpdateExchangeRateMutation } from '../api/exchange-rate-slice.api';

export const useUpdateExchangeRateMutationAction = () => {
  const [action, result] = useUpdateExchangeRateMutation();

  const updatePairStatus = async (
    id: string,
    {
      isActive,
    }: {
      isActive: boolean;
    },
  ) => {
    return action({ isActive, id }).unwrap();
  };

  return {
    updatePairStatus,
    ...result,
  };
};
