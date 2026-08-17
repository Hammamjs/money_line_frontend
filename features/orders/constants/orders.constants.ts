export const orderKey = {
  type: 'Orders' as const,
  list: () => ({ type: orderKey.type, id: 'LIST' }) as const,
  details: (id: string) => ({ type: orderKey.type, id }) as const,
} as const;
