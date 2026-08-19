import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PasswordResetSuccess = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="shadow-xl border-border/50 text-center">
        <CardContent className="pt-10 pb-8 space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {t.passwordResetSuccess}
            </h2>
            <p className="text-muted-foreground text-sm">{t.backToSignIn}</p>
          </div>
          <Button
            className="w-full h-11"
            onClick={() => router.push('/sign-in')}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />{' '}
            {t.signIn}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
