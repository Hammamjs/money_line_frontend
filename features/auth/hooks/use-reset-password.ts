import { useResetPasswordMutation } from '../api/auth-slice.api';
import { TResetPasswordSchema } from '../schema/reset-password-schema';

export const useResetPassword = () => {
  const [action, result] = useResetPasswordMutation();

  const onResetPassword = async (
    data: TResetPasswordSchema & { email: string },
  ) => {
    return action(data).unwrap();
  };

  return {
    onResetPassword,
    ...result,
  };
};
