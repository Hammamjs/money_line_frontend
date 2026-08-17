import { useUpdateUserRoleMutation } from '../api/users-slice.api';

export const useUpdateUserRole = () => {
  const [action, result] = useUpdateUserRoleMutation();

  const onUpdateRole = async (data: { id: string; role: 'admin' | 'user' }) => {
    return action(data).unwrap();
  };

  return {
    onUpdateRole,
    ...result,
  };
};
