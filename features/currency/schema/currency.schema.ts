import { string, z } from 'zod';

export const CurrencySchema = z.object({
  flag: string().trim().min(1, 'Flag is required'),
  symbol: string()
    .trim()
    .min(1, 'Symbol is required')
    .max(1, 'Symbol must be on character')
    .regex(/[^A-Za-z0-9]$/, 'Must be special character'),
  name: string().trim().min(1, 'Currency name is required'),
  code: string().trim().min(1, 'Currency code is required'),
});

export type TCurrencySchema = z.infer<typeof CurrencySchema>;

export const CURRENCY_DEFAULT_VALUES: TCurrencySchema = {
  name: '',
  symbol: '',
  flag: '',
  code: '',
};
