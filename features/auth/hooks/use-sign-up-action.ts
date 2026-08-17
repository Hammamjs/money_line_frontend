import { useSignupMutation } from '../api/auth-slice.api';
import { TFormSchema } from '../schema/sign-up.schema';

export const useSignUp = () => {
  const [action, result] = useSignupMutation();

  const signup = async (values: TFormSchema) => {
    return action(values).unwrap();
  };

  return {
    signup,
    ...result,
  };
};
