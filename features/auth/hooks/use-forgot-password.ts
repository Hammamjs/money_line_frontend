import { useForgetPasswordMutation } from '../api/auth-slice.api';

export const useForgetPassword = () => {
  const [action, result] = useForgetPasswordMutation();

  const onForgetPassword = async (email: string) => {
    return action({ email }).unwrap();
  };

  return {
    onForgetPassword,
    ...result,
  };
};
