import { useNotifyUsersMutation } from '@/features/notifications/api/notifications-slice.api';

export const useNotifyUsersAction = () => {
  const [action, result] = useNotifyUsersMutation();

  const notifyAll = async (data: { message: string; title: string }) => {
    return action(data).unwrap();
  };

  return {
    notifyAll,
    ...result,
  };
};
