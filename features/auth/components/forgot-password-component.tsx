'use client';

import { AnimatePresence } from 'framer-motion';
import { FindEmail } from './find-email';
import { VerifyCode } from './verify-code';
import { SetNewPassword } from './set-new-password';
import { PasswordResetSuccess } from './password-reset';
import { useForgotPasswordUi } from '../hooks/use-forgot-password-ui';
import { useForgotPasswordActions } from '../hooks/use-forgot-password-actions';

export default function ForgotPassword() {
  const ui = useForgotPasswordUi();
  const {
    handleReset,
    handleSendCode,
    handleVerify,
    isReset,
    isSearching,
    isVerifying,
  } = useForgotPasswordActions(ui);

  const {
    code,
    email,
    resetForm,
    setCode,
    setEmail,
    setStep,
    step,
    stepIndex,
  } = ui;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md space-y-4">
        {/* Progress dots */}
        {step !== 'done' && (
          <div className="flex items-center justify-center gap-2 mb-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i < stepIndex
                    ? 'w-8 bg-primary'
                    : i === stepIndex
                      ? 'w-10 bg-primary'
                      : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── Step 1: Email ── */}
          {step === 'email' && (
            <FindEmail
              email={email}
              handleSendCode={handleSendCode}
              isLoading={isSearching}
              setEmail={setEmail}
            />
          )}

          {/* ── Step 2: Verify Code ── */}
          {step === 'verify' && (
            <VerifyCode
              isVerifying={isVerifying}
              code={code}
              email={email}
              handleVerify={handleVerify}
              resend={handleSendCode}
              setCode={setCode}
              setStep={setStep}
            />
          )}

          {/* ── Step 3: New Password ── */}
          {step === 'reset' && (
            <SetNewPassword
              handleReset={handleReset}
              form={resetForm}
              isReset={isReset}
            />
          )}

          {/* ── Done ── */}
          {step === 'done' && <PasswordResetSuccess />}
        </AnimatePresence>
      </div>
    </div>
  );
}
