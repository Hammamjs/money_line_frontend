import { Button } from '@/components/ui/button';
import { PasswordRule } from './password-rule';
import { TextInput } from '@/components/textInput';
import { PasswordInput } from '@/components/passwordInput';
import { useTranslation } from '@/lib/i18n';
import { useSignUpForm } from '../hooks/use-sign-up-form';
import { useSignUpSubmit } from '../hooks/use-sign-up-onSubmit';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { form, password, passwordStatus } = useSignUpForm();
  const { onSubmit, isLoading } = useSignUpSubmit();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        form={form}
        type="text"
        label={t.username}
        id="username"
        name="username"
        placeholder="eg. Waleed Hassan"
        testId="input-signup-username"
      />

      <TextInput
        form={form}
        type="email"
        label={t.email}
        id="email"
        name="email"
        placeholder="eg. waleed@mail.com"
        testId="input-signup-email"
      />

      <PasswordInput
        form={form}
        id="password"
        label={t.password}
        name="password"
        testId="input-signin-password"
      />

      <div className="mt-2 space-y-1">
        <PasswordRule
          passed={passwordStatus.passowrdLength}
          text={t.passReq.requirements.minLength}
        />
        <PasswordRule
          passed={passwordStatus.uppercase}
          text={t.passReq.requirements.uppercase}
        />
        <PasswordRule
          passed={passwordStatus.lowercase}
          text={t.passReq.requirements.lowercase}
        />
        <PasswordRule
          passed={passwordStatus.number}
          text={t.passReq.requirements.number}
        />
        <PasswordRule
          passed={passwordStatus.special}
          text={t.passReq.requirements.special}
        />
      </div>

      <PasswordInput
        form={form}
        id="confirmPassword"
        label={t.confirmPassword}
        name="confirmPassword"
        testId="input-signin-confirmPassword"
      />

      {password.length > 1 && (
        <div className="mt-2 space-y-1">
          <PasswordRule
            passed={passwordStatus.matched}
            text={t.passReq.requirements.match}
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 text-base"
        disabled={isLoading}
        data-testid="btn-submit-signin"
      >
        {isLoading ? '...' : t.signUp}
      </Button>
    </form>
  );
};
