import { Save, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from '@/lib/i18n';
import { TAccountSchema } from '../schema/accounts.schema';
import { AccountSelect } from './account-type-select';

type Props = {
  form: UseFormReturn<TAccountSchema>;
  onSave: () => void;
  onCancel: () => void;
};

export function BankAccountForm({ onSave, onCancel, form }: Props) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="bankName">{t.paymentProvider}</Label>
          <Input
            id="bankName"
            {...form.register('bankName')}
            placeholder="Khartoum Bank"
            autoFocus
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="accountNumber">{t.accountNum}</Label>
          <Input
            id="accountNumber"
            {...form.register('accountNumber')}
            placeholder="1234567890"
            inputMode="numeric"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="label">{t.accountLabel}</Label>
          <Input
            id="label"
            {...form.register('label')}
            placeholder="Label"
            inputMode="text"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="iban">{t.iban}</Label>
          <Input
            id="iban"
            {...form.register('iban')}
            placeholder="SA12A0000100001"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t.phoneNum}</Label>
          <Input
            id="phone"
            {...form.register('phone')}
            placeholder="0123456789"
            inputMode="tel"
          />
        </div>
        <div className="space-y-1.5">
          <AccountSelect form={form} name="type" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          <X className="mr-1.5 h-3.5 w-3.5" /> Cancel
        </Button>
        <Button size="sm" onClick={onSave} disabled={!form.formState.isValid}>
          <Save className="mr-1.5 h-3.5 w-3.5" /> Save account
        </Button>
      </div>
    </div>
  );
}
