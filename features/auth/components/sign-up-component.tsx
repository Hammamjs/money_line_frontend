'use client';

import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';

import { useTranslation } from '@/lib/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from './sign-up-form';

export default function SignUp() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30 py-12">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <ArrowRightLeft className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.signUp}</CardTitle>
          <CardDescription>
            {t.appName} - {t.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className="mt-8 text-center text-sm">
            <Link
              href="/sign-in"
              className="text-primary hover:underline font-medium"
              data-testid="link-to-signin"
            >
              {t.hasAccount}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
