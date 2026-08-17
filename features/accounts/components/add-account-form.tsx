import { Card, CardContent } from '@/components/ui/card';
import { AccountForm } from './account-form';
import { AccountTypeOption } from './account-type-option';
import { AddAcountHeader } from './add-account-header';
import { UseFormReturn } from 'react-hook-form';
import { TAccountSchema } from '../schema/accounts.schema';
import { AccountType } from '../types';
import React from 'react';
import { useAccountActions } from '@/features/accounts/hooks/use-accounts-actions';

type Props = {
  form: UseFormReturn<TAccountSchema>;
  newType: AccountType;
  setNewType: React.Dispatch<React.SetStateAction<AccountType>>;
};

export const AddAccountForm = ({ form, newType, setNewType }: Props) => {
  const { handleAddAccount } = useAccountActions();
  return (
    <Card className="border-dashed border-2 border-primary/20">
      <AddAcountHeader />
      <CardContent className="space-y-3">
        {/* Type selector */}
        <AccountTypeOption newType={newType} setNewType={setNewType} />

        <AccountForm
          form={form}
          onSubmit={handleAddAccount}
          newType={newType}
        />
      </CardContent>
    </Card>
  );
};
