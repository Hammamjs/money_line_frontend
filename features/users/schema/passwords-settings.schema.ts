import z from 'zod';

export const PasswordSettingsSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password length must be at least 8 characters')
      .max(30, 'Password exceed allowed length')
      .regex(/[A-Z]/, 'Password must contains uppercase character')
      .regex(/[a-z]/, 'Password must contains one lowercase character')
      .regex(/[0-9]/, 'Password must contains at one number')
      .regex(/[^0-9A-Za-z]/, 'Passowrd must contains special character'),
    confirmPassword: z.string(),
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    {
      path: ['confirmPw'],
      error: 'New password and confirm password must matchs',
    },
  );

export type TPasswordSettingsSchema = z.infer<typeof PasswordSettingsSchema>;

export const DEFAULT_PASSWORD_VALUES: TPasswordSettingsSchema = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
