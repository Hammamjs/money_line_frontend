import { useUpdatePasswordMutation } from '../api/auth-slice.api';

export const useUpdatePasswordMutationAction = () => {
  const [action, result] = useUpdatePasswordMutation();

  const onUpdatePassword = async (data: {
    newPassword: string;
    currentPassword: string;
    confirmPassword: string;
  }) => {
    return action(data).unwrap();
  };

  return {
    onUpdatePassword,
    ...result,
  };
};
