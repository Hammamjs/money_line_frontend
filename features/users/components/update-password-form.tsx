import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n';

import { TPasswordSettingsSchema } from '../schema/passwords-settings.schema';
import { useUserSettingsActions } from '../hooks/use-user-settings-actions';

type Props = {
  form: UseFormReturn<TPasswordSettingsSchema>;
};

export const UpdatePasswordForm = ({ form }: Props) => {
  const { t } = useTranslation();
  const { handleChangePassword } = useUserSettingsActions();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.changePassword}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit(handleChangePassword)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.currentPassword}</label>
            <Input type="password" {...form.register('currentPassword')} />
            {form.formState.errors.currentPassword && (
              <span className="text-red-600">
                {form.formState.errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.newPassword}</label>
            <Input type="password" {...form.register('newPassword')} />
            {form.formState.errors.newPassword && (
              <span className="text-red-600">
                {form.formState.errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.confirmPassword}</label>
            <Input type="password" {...form.register('confirmPassword')} />
            {form.formState.errors.confirmPassword && (
              <span className="text-red-600">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            type="submit"
            disabled={!form.formState.isValid}
          >
            {t.changePassword}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
