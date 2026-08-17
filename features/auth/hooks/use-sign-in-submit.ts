import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { useTranslation } from '@/lib/i18n';

import { TFormSchema } from '../schema/sign-in.schema';
import { useSignIn } from './use-sign-in';
import { useSignInWithGoogle } from './use-sign-in-with-google';

export const useSignInSubmit = () => {
  const { handleSignIn, isLoading } = useSignIn();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { onSignIn } = useSignInWithGoogle();

  const { t } = useTranslation();

  const onSubmit = async (values: TFormSchema) => {
    try {
      const user = await handleSignIn(values);
      toast.success('Sigin succeseded');

      const returnUrl = searchParams.get('returnUrl');
      router.push(returnUrl || '/');
      console.log(user);
    } catch (err) {
      console.log(err);
      toast.error(t.invalidCreds);
    }
  };

  const handleSignWithGoogle = async () => {
    window.location.href = 'http://localhost:3000/api/auth/sign-in/google';
  };

  return {
    onSubmit,
    isLoading,
    handleSignWithGoogle,
  };
};
