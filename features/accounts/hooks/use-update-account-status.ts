import { useUpdateStatusMutation } from '../api/accounts-slice.api';

export const useUpdateAccountStatus = () => {
  const [action, result] = useUpdateStatusMutation();
  const onUpdateStatus = async (data: { id: string; isActive: boolean }) =>
    action(data).unwrap();

  return {
    onUpdateStatus,
    ...result,
  };
};
