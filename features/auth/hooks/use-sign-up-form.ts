import { passwordCheck } from '../lib/password-check';
import { formSchema, TFormSchema } from '../schema/sign-up.schema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({
    control: form.control,
    name: 'password',
  });
  const confirmPassword = useWatch({
    control: form.control,
    name: 'confirmPassword',
  });

  const passwordStatus = passwordCheck(password, confirmPassword);

  return {
    form,
    passwordStatus,
    password,
  };
};
