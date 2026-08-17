import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy } from 'lucide-react';
import { Account } from '../types';
import { useTranslation } from '@/lib/i18n';
import { buildAccountFields } from '../utils/build-account-field';

type Props = {
  copiedField: string | null;
  selectedAccount: Account | undefined;

  copyToClipboard: (text: string, field: string) => void;
};

export const AccountDetails = ({
  selectedAccount,
  copiedField,
  copyToClipboard,
}: Props) => {
  const { t } = useTranslation();

  const accountFields = buildAccountFields(selectedAccount, t);

  return (
    selectedAccount && (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-slate-50/50 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium">{t.sendToThisAccount}</span>
        </div>
        <div className="space-y-1">
          {accountFields.map((item) => (
            <div
              key={item.key}
              className="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white transition-colors"
            >
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </div>
                <div className="font-mono text-sm font-medium break-all">
                  {item.value}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(item.value, item.key)}
                className="h-8 w-8 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              >
                {copiedField === item.key ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </motion.div>
    )
  );
};
