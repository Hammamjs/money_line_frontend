'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { FieldValues, UseFormReturn, FieldPath } from 'react-hook-form';
import { useTranslation } from '@/lib/i18n';

type PasswordInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  id?: string;
  testId?: string;
};

export const PasswordInput = <T extends FieldValues>({
  form,
  label,
  name,
  id,
  testId,
}: PasswordInputProps<T>) => {
  const { lang } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const { error } = form.getFieldState(name, form.formState);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...form.register(name)}
          data-testid={testId}
        />

        <button
          type="button"
          className={
            lang === 'en'
              ? 'absolute top-1/2 right-3 -translate-y-1/2'
              : 'absolute top-1/2 left-3 -translate-y-1/2'
          }
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>

      {error?.message && (
        <p className="text-sm text-destructive">{error?.message}</p>
      )}
    </div>
  );
};
