'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { LangProvider } from '@/lib/i18n';
import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from './auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <LangProvider>
          <AuthProvider>{children}</AuthProvider>
        </LangProvider>
      </TooltipProvider>
    </Provider>
  );
}
