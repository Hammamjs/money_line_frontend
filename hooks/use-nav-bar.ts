import { useGetUserNotificationQuery } from '@/features/notifications/api/notifications-slice.api';
import { useMemo, useState } from 'react';
import { useAuthNav } from './use-auth-nav';

export const useNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: notifications } = useGetUserNotificationQuery();

  const { handleSignOut } = useAuthNav();

  const unread = useMemo(
    () => notifications?.filter((n) => n.status === 'unread').length ?? 0,
    [notifications],
  );

  return {
    unread,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleSignOut,
  };
};
