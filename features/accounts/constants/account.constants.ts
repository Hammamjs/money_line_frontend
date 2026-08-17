export const accountkey = {
  type: 'Acccounts' as const,
  details: (id: string) => ({ type: accountkey.type, id }) as const,
  list: () => ({ type: accountkey.type, id: 'LIST' }) as const,
} as const;
