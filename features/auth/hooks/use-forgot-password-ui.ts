import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Step } from '@/features/auth/types';

import {
  ResetPasswordSchema,
  TResetPasswordSchema,
} from '../schema/reset-password-schema';

export const useForgotPasswordUi = () => {
  const resetForm = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  });

  const [newPassword, confirmPassword] = useWatch({
    control: resetForm.control,
    name: ['confirmPassword', 'newPassword'],
  });

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const stepIndex = { email: 0, verify: 1, reset: 2, done: 3 }[step];

  return {
    resetForm,
    newPassword,
    confirmPassword,
    step,
    setStep,
    email,
    setEmail,
    code,
    setCode,
    stepIndex,
  };
};
