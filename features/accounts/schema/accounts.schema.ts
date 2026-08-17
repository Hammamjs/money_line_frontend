import z from 'zod';

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;

export const ACCOUNT_TYPES = ['Bank', 'Wallet'] as const;

export const AccountSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  iban: z
    .string()
    .min(1, 'IBAN is required')
    .transform((v: string) => v.replace(/\s+/g, '').toUpperCase())
    .pipe(z.string().regex(ibanRegex, { error: 'Invalid IBAN format' })),
  label: z.string().min(1, 'Label is required'),
  type: z.enum(ACCOUNT_TYPES, 'Invalid account type'),

  bankName: z.string().min(3, 'Bank name must be at least 3 characters'),
  accountNumber: z.string().min(1, 'Account number is required'),
  extraInfo: z.string().optional(),
});

export type TAccountSchema = z.infer<typeof AccountSchema>;

export const DEFAULT_ACCOUNT_VALUE: TAccountSchema = {
  phone: '',
  iban: '',
  label: '',
  bankName: '',
  accountNumber: '',
  extraInfo: '',
  type: 'Bank',
};
