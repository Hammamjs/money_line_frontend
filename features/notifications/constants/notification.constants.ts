export const notificationkey = {
  type: 'Notificaitons' as const,
  details: (id: string) => ({ type: notificationkey.type, id }) as const,
  list: () => ({ type: notificationkey.type, id: 'LIST' }) as const,
} as const;
