import { selectUser } from '@/features/auth/store/slices/auth-slice';
import { useTranslation } from '@/lib/i18n';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useUpdatePasswordMutationAction } from '@/features/auth/hooks/use-update-password';
import { TPasswordSettingsSchema } from '../schema/passwords-settings.schema';
import { useUpdateUserMutationAction } from './use-update-user-data-mutation-action';

export const useUserSettingsActions = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  const { onUpdate } = useUpdateUserMutationAction();
  const { onUpdatePassword } = useUpdatePasswordMutationAction();

  const handleSaveAccount = async ({ username }: { username: string }) => {
    if (!user) return;
    await onUpdate({ id: user.id, username });
    toast.success(t.settingsSaved);
  };

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: TPasswordSettingsSchema) => {
    await onUpdatePassword({
      confirmPassword,
      newPassword,
      currentPassword,
    });
    toast.success(t.passwordChanged);
  };

  return {
    handleSaveAccount,
    handleChangePassword,
  };
};
