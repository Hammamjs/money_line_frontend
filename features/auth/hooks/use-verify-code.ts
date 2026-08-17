import { useVerifyCodeMutation } from '../api/auth-slice.api';

export const useVerifyCodeMutationAction = () => {
  const [action, result] = useVerifyCodeMutation();

  const onVerify = async (data: { email: string; resetCode: string }) => {
    return action(data).unwrap();
  };

  return {
    onVerify,
    ...result,
  };
};
