import z from 'zod';

export const CreateOrderSchema = z.object({
  amount: z.string().nonempty('Amount is required'),
  paymentProvider: z.string().min(1, 'Payment provider is required'),
  phone: z.string().min(5, 'Phone number is required'),
  transactionProof: z
    .file()
    .optional()
    .refine((val) => val instanceof File, {
      error: 'Proof image transaction is required',
    }),
  transactorId: z.uuidv4().min(1, 'Invalid transactor id format'),
  fromAssetId: z.uuidv4().min(1, 'Invalid asset id format'),
  toAssetId: z.uuidv4().min(1, 'Invalid asset id format'),
  extraInfo: z.string().optional(),
  accountHolderName: z.string().min(1, 'Account owner is required'),
});

export type TCreateOrderSchema = z.infer<typeof CreateOrderSchema>;

export const DEFAULT_ORDER_VALUES: TCreateOrderSchema = {
  accountHolderName: '',
  amount: '',
  fromAssetId: '',
  paymentProvider: '',
  phone: '',
  toAssetId: '',
  transactionProof: undefined,
  extraInfo: undefined,
  transactorId: '',
} satisfies TCreateOrderSchema;
