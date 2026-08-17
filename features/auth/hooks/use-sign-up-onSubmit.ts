import { toast } from 'sonner';
import { useSignUp } from './use-sign-up-action';
import { TFormSchema } from '../schema/sign-up.schema';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { SubmitHandler } from 'react-hook-form';

export const useSignUpSubmit = () => {
  const { signup, isLoading } = useSignUp();
  const router = useRouter();

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<TFormSchema> = async (values) => {
    try {
      await signup(values);
      toast.success(t.accountCreated);
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create the account');
    }
  };

  return { onSubmit, isLoading };
};
