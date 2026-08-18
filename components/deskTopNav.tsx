import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Globe,
  Bell,
  Settings,
  MessageSquare,
  LayoutList,
  TrendingUp,
  User,
  LogOut,
  Mail,
  ChevronDown,
  User2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store';
import { useTranslation } from '@/lib/i18n';

export const DesktopNav = ({
  unread,
  handleSignOut,
}: {
  unread: number;
  handleSignOut: () => void;
}) => {
  const user = useSelector(selectUser);
  const isAdmin = ['admin', 'super_admin'].includes(user?.role || 'user');
  const { t, lang, toggleLang } = useTranslation();

  return (
    <div className="hidden md:flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLang}
        className="font-semibold gap-2"
        data-testid="button-lang-toggle"
      >
        <Globe className="h-4 w-4" />
        {lang === 'en' ? 'عربي' : 'EN'}
      </Button>

      {user ? (
        <div className="flex items-center gap-1">
          {!isAdmin && (
            <>
              <Link href={`/orders/${user.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium gap-1.5"
                  data-testid="link-orders"
                >
                  <LayoutList className="w-4 h-4" />
                  {t.myOrders}
                </Button>
              </Link>

              {/* Notification bell */}
              <Link href="/notifications">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  data-testid="link-notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold">
                      {unread > 9 ? '9+' : unread}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {isAdmin && (
            <div className="flex items-center gap-0.5">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-amber-500 font-medium text-xs"
                  data-testid="link-admin"
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  {t.adminPanel}
                </Button>
              </Link>
              <Link href="/users-list">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-amber-500 font-medium text-xs"
                  data-testid="link-admin"
                >
                  <User2 className="w-3.5 h-3.5" />
                  {t.usersList}
                </Button>
              </Link>
              <Link href="/admin/rates">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-amber-500 font-medium text-xs"
                  data-testid="link-admin-rates"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t.exchangeRates}
                </Button>
              </Link>
              <Link href="/admin/messages">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-amber-500 font-medium text-xs"
                  data-testid="link-admin-messages"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t.adminMessages}
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-500 w-8 h-8"
                  data-testid="link-admin-settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 rounded-xl border-yellow-500/30 bg-black/40 px-3 text-white transition-all hover:border-yellow-500 hover:bg-yellow-500/10"
                data-testid="menu-user"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-amber-600 font-bold text-black">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <div className="ml-3 hidden flex-col items-start sm:flex">
                  <span className="text-sm font-semibold">
                    {user.username.split(' ')[0]}
                  </span>
                  <span className="text-xs text-zinc-400">Account</span>
                </div>

                <ChevronDown className="ml-2 h-4 w-4 text-yellow-400" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-72 rounded-xl border border-yellow-500/20 bg-zinc-950 p-2 text-white shadow-2xl"
            >
              <DropdownMenuLabel className="px-3 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-amber-600 text-lg font-bold text-black">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {user.username}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>

              {!isAdmin && (
                <>
                  <DropdownMenuSeparator className="my-2 bg-yellow-500/20" />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                    >
                      <User className="h-4 w-4 text-yellow-400" />
                      <span>{t.profile}</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator className="my-2 bg-yellow-500/20" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer rounded-lg px-3 py-3 text-red-400 transition-colors focus:bg-red-500/10 focus:text-red-300"
                data-testid="button-signout"
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t.signOut}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium"
              data-testid="link-signin"
            >
              {t.signIn}
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              data-testid="link-signup"
            >
              {t.signUp}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
