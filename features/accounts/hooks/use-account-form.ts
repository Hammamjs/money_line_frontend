import { useForm } from 'react-hook-form';
import {
  AccountSchema,
  DEFAULT_ACCOUNT_VALUE,
  TAccountSchema,
} from '../schema/accounts.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountType } from '../types';
import { useState } from 'react';

export const useAccountForm = () => {
  const [newType, setNewType] = useState<AccountType>('Bank');

  const accountForm = useForm<TAccountSchema>({
    resolver: zodResolver(AccountSchema),
    defaultValues: DEFAULT_ACCOUNT_VALUE,
    mode: 'onChange',
  });

  return {
    newType,
    setNewType,
    accountForm,
  };
};
