export const rateKey = {
  type: 'Rate',
  list: () => ({ type: rateKey.type, id: 'LIST' }) as const,
  details: (fromId: string, toId: string) =>
    ({ type: rateKey.type, id: `${fromId}-${toId}` }) as const,
} as const;
