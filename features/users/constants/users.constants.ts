export const usersKey = {
  type: 'User' as const,
  details: (id: string) => ({ type: usersKey.type, id }) as const,
  list: () => ({ type: usersKey.type, id: 'LIST' }) as const,
} as const;
