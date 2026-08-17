import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/textInput';
import { PasswordInput } from '@/components/passwordInput';
import { useTranslation } from '@/lib/i18n';
import { useSignInForm } from '../hooks/use-sign-in-form';
import { useSignInSubmit } from '../hooks/use-sign-in-submit';

export const SignInForm = () => {
  const { form } = useSignInForm();

  const { onSubmit, isLoading, handleSignWithGoogle } = useSignInSubmit();

  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        form={form}
        label={t.email}
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        testId="input-signin-email"
      />

      <PasswordInput
        form={form}
        label={t.password}
        name="password"
        id="password"
        testId="input-signin-password"
      />

      <div className="-mt-2 flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          {t.forgotPassword}
        </Link>
      </div>

      {/* Email / Password */}
      <Button
        type="submit"
        className="h-11 w-full text-base"
        disabled={isLoading}
        data-testid="btn-submit-signin"
      >
        {isLoading ? '...' : t.signIn}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">OR</span>
        </div>
      </div>

      {/* Google */}
      <Button
        type="button"
        variant="outline"
        className="group relative h-11 w-full border-border bg-background text-base font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
        onClick={handleSignWithGoogle}
        disabled={isLoading}
        data-testid="btn-signin-google"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            {t.signInWithGoogle}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <GoogleIcon />
            <span>{t.signInWithGoogle}</span>
          </span>
        )}
      </Button>
    </form>
  );
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.38Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.58A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.11l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.45 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
      />
    </svg>
  );
}
