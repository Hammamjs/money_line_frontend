import { TAccountSchema } from '../schema';
import { useAddAccountMutation } from '../api/accounts-slice.api';

export const useAddAccount = () => {
  const [action, result] = useAddAccountMutation();

  const onAdd = async (data: TAccountSchema) => {
    return action(data).unwrap();
  };

  return {
    onAdd,
    ...result,
  };
};
