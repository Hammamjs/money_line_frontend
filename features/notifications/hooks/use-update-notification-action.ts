import { useUpdateNotificationMutation } from '../api/notifications-slice.api';

export const useUpdateNotificationAction = () => {
  const [action, result] = useUpdateNotificationMutation();

  const markAsRead = async (id: string) => {
    return action({ id }).unwrap();
  };

  return {
    markAsRead,
    ...result,
  };
};
