import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  email: string;
  isLoading: boolean;

  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSendCode: () => void;
};

export const FindEmail = ({
  email,
  handleSendCode,
  isLoading,
  setEmail,
}: Props) => {
  const { t } = useTranslation();
  return (
    <motion.div
      key="email"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <Card className="shadow-xl border-border/50">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-2">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.forgotPasswordTitle}</CardTitle>
          <CardDescription>{t.forgotPasswordDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.email}</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
              autoFocus
            />
          </div>
          <Button
            className="w-full h-11"
            onClick={handleSendCode}
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? '…' : t.sendCode}
          </Button>
          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />{' '}
              {t.backToSignIn}
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
