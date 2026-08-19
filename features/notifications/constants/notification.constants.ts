export const notificationKey = {
  type: 'Notification' as const,
  details: (id: string) => ({ type: notificationKey.type, id }) as const,
  list: () => ({ type: notificationKey.type, id: 'LIST' }) as const,
} as const;
