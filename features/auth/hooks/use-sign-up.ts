import { useTranslation } from '@/lib/i18n';
import { useSignUpForm } from './use-sign-up-form';

export const useSignUp = () => ({
  ...useSignUpForm(),
  ...useTranslation(),
});
