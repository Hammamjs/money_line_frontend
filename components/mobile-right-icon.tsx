import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Bell, Globe, Menu, X } from 'lucide-react';
import React from 'react';
import { selectUser } from '@/features/auth/store';
import { useTranslation } from '@/lib/i18n';

type Props = {
  unread: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileRightIcon = ({
  unread,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}: Props) => {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const { toggleLang } = useTranslation();
  return (
    <div className="md:hidden flex items-center gap-1">
      {user && !isAdmin && (
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative w-9 h-9">
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </Button>
        </Link>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLang}
        className="w-9 h-9"
        data-testid="button-lang-toggle-mobile"
      >
        <Globe className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="w-9 h-9"
        data-testid="button-mobile-menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
