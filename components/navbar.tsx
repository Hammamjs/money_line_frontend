'use client';

import Link from 'next/link';
import { MobileNav } from './mobileNav';
import { DesktopNav } from './deskTopNav';
import { useNavbar } from '@/hooks/use-nav-bar';
import { MobileRightIcon } from './mobile-right-icon';
import { ArrowRightLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function Navbar() {
  const { handleSignOut, isMobileMenuOpen, setIsMobileMenuOpen, unread } =
    useNavbar();
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:scale-105 transition-transform">
            <ArrowRightLeft className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">
            {t.appName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <DesktopNav unread={unread} handleSignOut={handleSignOut} />

        {/* Mobile right icons */}
        <MobileRightIcon
          unread={unread}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav
        unread={unread}
        isMobileMenuOpen={isMobileMenuOpen}
        handleSignOut={handleSignOut}
      />
    </nav>
  );
}
