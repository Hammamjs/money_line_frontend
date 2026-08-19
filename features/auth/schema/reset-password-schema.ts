import z from 'zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain one capital latter')
      .regex(/[a-z]/, 'Password must contain one small latter')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(
        /^[A-Za-z0-9]/,
        'Password must contain on special character at least',
      ),

    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      path: ['confirmPassword'],
      error: 'Passwords must match',
    },
  );

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const RESET_PASSWORD_RESET_VALUES: TResetPasswordSchema = {
  confirmPassword: '',
  newPassword: '',
};
