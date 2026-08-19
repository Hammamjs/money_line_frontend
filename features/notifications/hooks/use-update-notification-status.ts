import { useUpdateNotificationsMutation } from '../api/notifications-slice.api';

export const useUpdateNotificationsStatusAction = () => {
  const [action, result] = useUpdateNotificationsMutation();

  const updateStatus = async () => {
    return action().unwrap();
  };

  return {
    updateStatus,
    ...result,
  };
};
