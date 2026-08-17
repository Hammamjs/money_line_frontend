export const getInitials = (username: string) =>
  (username || '')
    .toUpperCase()
    .trim()
    .split(/\s+/)
    .map((n) => n.charAt(0))
    .join('')
    .slice(0, 2);
