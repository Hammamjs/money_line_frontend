import { TAccountSchema } from '../schema/accounts.schema';
import { useUpdateAccountMutation } from '../api/accounts-slice.api';

export const useUpdateAccount = () => {
  const [action, result] = useUpdateAccountMutation();

  const onUpdate = async (data: TAccountSchema & { id: string }) => {
    return action(data).unwrap();
  };

  return {
    onUpdate,
    ...result,
  };
};
