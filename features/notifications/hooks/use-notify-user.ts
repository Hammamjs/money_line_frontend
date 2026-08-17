import { useNotifyUserMutation } from '../api/notifications-slice.api';

export const useNotifyUserAction = () => {
  const [action, result] = useNotifyUserMutation();

  const notifyUser = async ({
    userId,
    title,
    message,
  }: {
    userId: string;
    title: string;
    message: string;
  }) => {
    return action({ userId, title, message }).unwrap();
  };

  return {
    notifyUser,
    ...result,
  };
};
