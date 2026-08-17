import { useUpdateUserMutation } from '../api/users-slice.api';

export const useUpdateUserMutationAction = () => {
  const [action, result] = useUpdateUserMutation();

  const onUpdate = async ({
    id,
    username,
  }: {
    id: string;
    username: string;
  }) => {
    return action({ id, username }).unwrap();
  };

  return {
    onUpdate,
    ...result,
  };
};
