import { useCreateOrderMutation } from '../api/orders-slice.api';

export const useCreateOrderMutationAction = () => {
  const [action, result] = useCreateOrderMutation();

  const onCreate = (data: FormData) => {
    return action(data).unwrap();
  };

  return {
    onCreate,
    ...result,
  };
};
