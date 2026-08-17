import { useDeleteNotificationMutation } from '../api/notifications-slice.api';

export const useDeleteNotificationAction = () => {
  const [action, result] = useDeleteNotificationMutation();

  const deleteNotfication = async (id: string) => {
    return action({ id }).unwrap();
  };

  return {
    deleteNotfication,
    ...result,
  };
};
