import { useLogOut } from '@/features/auth/hooks';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

export const useAuthNav = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { handleLogout, isLoading } = useLogOut();

  const handleSignOut = async () => {
    await handleLogout();
    toast.success(t.signedOut);
    router.push('/sign-in');
  };

  return { isLoading, handleSignOut };
};
