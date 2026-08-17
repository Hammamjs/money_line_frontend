import { useLogoutMutation } from '../api/auth-slice.api';

export const useLogOut = () => {
  const [action, result] = useLogoutMutation();

  const handleLogout = async () => {
    return action().unwrap();
  };

  return {
    handleLogout,
    ...result,
  };
};
