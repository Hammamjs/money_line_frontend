import React from 'react';
import { toast } from 'sonner';

import { Step } from '@/features/auth/types';
import { useTranslation } from '@/lib/i18n';

import { useForgetPassword } from './use-forgot-password';
import { useResetPassword } from './use-reset-password';
import { useVerifyCodeMutationAction } from './use-verify-code';

type Props = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  code: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

export const useForgotPasswordActions = ({
  code,
  confirmPassword,
  email,
  newPassword,
  setStep,
}: Props) => {
  const { onForgetPassword, isLoading: isSearching } = useForgetPassword();
  const { onVerify, isLoading: isVerifying } = useVerifyCodeMutationAction();
  const { onResetPassword, isLoading: isReset } = useResetPassword();

  const { t } = useTranslation();

  const handleSendCode = async () => {
    if (!email.trim()) return;
    const res = await onForgetPassword(email);
    toast.success(res.message);
    setStep('verify');
  };

  const handleVerify = async () => {
    await onVerify({ email, resetCode: code });
    toast.success(t.verifyCode);
    setStep('reset');
    return;
  };

  const handleReset = async () => {
    await onResetPassword({ newPassword, confirmPassword, email });
    toast.success(t.passwordResetSuccess);
    setStep('done');
  };

  return {
    isSearching,
    handleSendCode,
    handleVerify,
    handleReset,
    isVerifying,
    isReset,
  };
};
