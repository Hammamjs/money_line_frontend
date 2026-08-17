import { useDeleteMutation } from '../api/accounts-slice.api';

export const useDeleteAccount = () => {
  const [action, result] = useDeleteMutation();

  const onDelete = async (id: string) => {
    return action({ id }).unwrap();
  };

  return {
    onDelete,
    ...result,
  };
};
