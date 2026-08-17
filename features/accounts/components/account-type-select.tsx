import { Path, UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TAccountSchema } from '../schema/accounts.schema';
import { useTranslation } from '@/lib/i18n';

const ACCOUNT_TYPES = ['Bank', 'Wallet'] as const;
type AccountType = (typeof ACCOUNT_TYPES)[number];

interface AccountSelectProps {
  form: UseFormReturn<TAccountSchema>;
  name?: Path<TAccountSchema>;
}

export function AccountSelect({ form, name = 'type' }: AccountSelectProps) {
  const selectedValue = form.watch(name);
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{t.accountType}</Label>
      <Select
        value={selectedValue}
        onValueChange={(val: AccountType) => {
          form.setValue(name, val, { shouldValidate: true, shouldDirty: true });
        }}
      >
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder="Select account type" />
        </SelectTrigger>
        <SelectContent>
          {ACCOUNT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {form.formState.errors[name] && (
        <p className="text-sm font-medium text-destructive">
          {form.formState.errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
