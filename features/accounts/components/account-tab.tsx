import { UseFormReturn } from 'react-hook-form';
import {
  type TPasswordSettingsSchema,
  TProfileSettingsSchema,
} from '@/features/users/schema';
import { UpdatePasswordForm } from '@/features/users/components';
import { UserInfoForm } from '@/features/users/components/user-info-form';
import { TabsContent } from '@/components/ui/tabs';

type Props = {
  passwordForm: UseFormReturn<TPasswordSettingsSchema>;
  profileForm: UseFormReturn<TProfileSettingsSchema>;
};

export const AccountTab = ({ profileForm, passwordForm }: Props) => {
  return (
    <TabsContent value="account" className="space-y-4">
      <UserInfoForm form={profileForm} />
      <UpdatePasswordForm form={passwordForm} />
    </TabsContent>
  );
};
