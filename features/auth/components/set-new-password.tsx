import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n';
import { TResetPasswordSchema } from '../schema/reset-password-schema';

type Props = {
  form: UseFormReturn<TResetPasswordSchema>;
  isReset: boolean;

  handleReset: () => void;
};

export const SetNewPassword = ({ form, handleReset, isReset }: Props) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key="reset"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <Card className="shadow-xl border-border/50">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-2">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.resetPasswordTitle}</CardTitle>
          <CardDescription>{t.resetPasswordDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.newPassword}</label>
            <Input
              type="password"
              {...form.register('newPassword')}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.confirmPassword}</label>
            <Input type="password" {...form.register('confirmPassword')} />
          </div>
          <Button
            className="w-full h-11"
            onClick={handleReset}
            disabled={!form.formState.isValid || isReset}
          >
            {form.formState.isSubmitting ? '…' : t.resetPassword}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
