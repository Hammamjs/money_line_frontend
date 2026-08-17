import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

import { TProfileSettingsSchema } from '../schema/profile-settings.schema';
import { useUserSettingsActions } from '../hooks/use-user-settings-actions';

type Props = {
  form: UseFormReturn<TProfileSettingsSchema>;
};

export const UserInfoForm = ({ form }: Props) => {
  const { handleSaveAccount } = useUserSettingsActions();
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.accountInfo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSaveAccount)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.username}</label>
            <Input type="text" {...form.register('username')} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.email}</label>
            <Input type="email" {...form.register('email')} />
          </div>
          <Button
            // onClick={handleSaveAccount}
            className="w-full sm:w-auto"
          >
            {t.saveChanges}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
