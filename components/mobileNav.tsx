import Link from 'next/link';
import { Button } from './ui/button';
import {
  Bell,
  LayoutList,
  MessageSquare,
  Settings,
  TrendingUp,
  UserCircle,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store/slices/auth-slice';
import { useTranslation } from '@/lib/i18n';

type Props = {
  unread: number;
  isMobileMenuOpen: boolean;
  handleSignOut: () => void;
};

export const MobileNav = ({
  handleSignOut,
  isMobileMenuOpen,
  unread,
}: Props) => {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const { t } = useTranslation();

  return (
    isMobileMenuOpen && (
      <div className="md:hidden border-t border-border/40 bg-background px-4 py-3 space-y-1 shadow-lg absolute w-full left-0 z-50">
        {user ? (
          <>
            <div className="px-3 py-2 border-b border-border/40 mb-2">
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {!isAdmin && (
              <>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10"
                  >
                    <UserCircle className="w-4 h-4" /> {t.profile}
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10"
                    data-testid="mobile-link-orders"
                  >
                    <LayoutList className="w-4 h-4" /> {t.myOrders}
                  </Button>
                </Link>
                <Link href="/notifications">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10"
                  >
                    <Bell className="w-4 h-4" /> {t.notifications}
                    {unread > 0 && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                        {unread}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10 text-amber-500"
                  >
                    <LayoutList className="w-4 h-4" /> {t.adminPanel}
                  </Button>
                </Link>
                <Link href="/admin-rates">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10 text-amber-500"
                  >
                    <TrendingUp className="w-4 h-4" /> {t.exchangeRates}
                  </Button>
                </Link>
                <Link href="/admin-messages">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10 text-amber-500"
                  >
                    <MessageSquare className="w-4 h-4" /> {t.adminMessages}
                  </Button>
                </Link>
                <Link href="/admin-settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10 text-amber-500"
                  >
                    <Settings className="w-4 h-4" /> {t.adminSettings}
                  </Button>
                </Link>
              </>
            )}

            <div className="border-t border-border/40 pt-1 mt-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive h-10 gap-2"
                onClick={handleSignOut}
                data-testid="mobile-button-signout"
              >
                {t.signOut}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 py-1">
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="w-full h-10"
                data-testid="mobile-link-signin"
              >
                {t.signIn}
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="w-full h-10" data-testid="mobile-link-signup">
                {t.signUp}
              </Button>
            </Link>
          </div>
        )}
      </div>
    )
  );
};
