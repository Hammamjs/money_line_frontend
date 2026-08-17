import { motion } from 'framer-motion';
import { ArrowLeft, KeyRound, RefreshCw } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Step } from '@/features/auth/types';
import { useTranslation } from '@/lib/i18n';

type Props = {
  email: string;
  code: string;
  isVerifying: boolean;

  setStep: React.Dispatch<React.SetStateAction<Step>>;
  handleVerify: () => void;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  resend: () => void;
};

export const VerifyCode = ({
  code,
  email,
  handleVerify,
  resend,
  setCode,
  isVerifying,
  setStep,
}: Props) => {
  const { t } = useTranslation();
  return (
    <motion.div
      key="verify"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <Card className="shadow-xl border-border/50">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-2">
            <KeyRound className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.verifyCodeTitle}</CardTitle>
          <CardDescription>{t.verifyCodeDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm  text-green-400">
                The code was sent to {email}
              </p>
            </div>
            <button
              onClick={resend}
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              title={t.resendCode}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t.verificationCode}</label>
            <Input
              placeholder="000000"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="text-center text-xl font-bold tracking-widest h-12"
              maxLength={6}
              autoFocus
            />
          </div>
          <Button
            className="w-full h-11"
            onClick={handleVerify}
            disabled={code.length !== 6}
          >
            {t.verifyCode}
          </Button>
          <button
            onClick={() => setStep('email')}
            disabled={isVerifying}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" /> {t.back}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
