import { z } from 'zod';
export const exchangeRateSchema = z
  .object({
    fromId: z.string().trim().min(1, 'From currency is required'),
    toId: z.string().trim().min(1, 'To currency is required'),
    rate: z.number().min(1, 'Rate is required'),
  })
  .refine(({ fromId, toId }) => fromId !== toId, {
    error: 'From and To must differ',
    path: ['from'],
  });

export type TExchangeRateSchema = z.infer<typeof exchangeRateSchema>;

export const EXCHANGE_RATE_DEFAUTL_VALUES: TExchangeRateSchema = {
  fromId: '',
  toId: '',
  rate: 0,
};
