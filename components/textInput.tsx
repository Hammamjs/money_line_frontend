'use client';

import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from './ui/input';

type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  type: 'email' | 'text';
  placeholder?: string;
  id?: string;
  testId?: string;
};

export const TextInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  id,
  testId,
  type = 'text',
}: TextInputProps<T>) => {
  const { error } = form.getFieldState(name, form.formState);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...form.register(name)}
        data-testid={testId}
      />

      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};
