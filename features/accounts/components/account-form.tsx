import { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { type TAccountSchema } from '../schema/accounts.schema';
import { AccountType } from '../types';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type Props = {
  form: UseFormReturn<TAccountSchema>;
  newType: AccountType;
  onSubmit: (data: TAccountSchema, newType: AccountType) => void;
};

export const AccountForm = ({ form, newType, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <form
      className="space-y-3"
      onSubmit={form.handleSubmit((data) => {
        onSubmit(data, newType);
        form.reset();
      })}
    >
      <Input placeholder={t.accountLabel} {...form.register('label')} />
      {form.formState.errors['label'] && (
        <span>{form.formState.errors['label'].message}</span>
      )}
      <Input placeholder={t.phoneNum} {...form.register('phone')} />
      <Input placeholder={t.accountName} {...form.register('bankName')} />
      <Input placeholder={t.accountNum} {...form.register('accountNumber')} />
      {newType === 'Bank' && (
        <Input placeholder={t.iban} {...form.register('iban')} />
      )}
      <Input placeholder={t.extraInfo} {...form.register('extraInfo')} />

      <Button
        type="submit"
        disabled={!form.formState.isValid}
        className="w-full mt-3"
      >
        <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> {t.addAccount}
      </Button>
    </form>
  );
};
