import { useSignInMutation } from '../api/auth-slice.api';

export const useSignIn = () => {
  const [signIn, result] = useSignInMutation();

  const handleSignIn = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return signIn({ email, password }).unwrap();
  };

  return {
    handleSignIn,
    ...result,
  };
};
