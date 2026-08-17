import { useSignInWithGoogleMutation } from '../api/auth-slice.api';

export const useSignInWithGoogle = () => {
  const [action, result] = useSignInWithGoogleMutation();

  const onSignIn = async () => action().unwrap();

  return {
    onSignIn,
    ...result,
  };
};
