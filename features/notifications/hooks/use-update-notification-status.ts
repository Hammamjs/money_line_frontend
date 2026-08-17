import { useUpdateNotificatoinsMutation } from '../api/notifications-slice.api';

export const useUpdateNotificationsStatusAction = () => {
  const [action, result] = useUpdateNotificatoinsMutation();

  const updateStatus = async () => {
    return action().unwrap();
  };

  return {
    updateStatus,
    ...result,
  };
};
