import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';
import {
  AccountSchema,
  DEFAULT_ACCOUNT_VALUE,
  TAccountSchema,
} from '../schema/accounts.schema';
import {
  useAddAccount,
  useDeleteAccount,
  useUpdateAccount,
  useUpdateAccountStatus,
} from '@/features/accounts/hooks';
import { useState } from 'react';
import { Account } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useAccountActions = () => {
  const [defaultId, setDefaultId] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { onDelete } = useDeleteAccount();
  const { onUpdate } = useUpdateAccount();
  const { onAdd } = useAddAccount();

  const { t } = useTranslation();

  const form = useForm<TAccountSchema>({
    resolver: zodResolver(AccountSchema),
    defaultValues: DEFAULT_ACCOUNT_VALUE,
    mode: 'onChange',
  });

  const startAdd = () => {
    form.reset(DEFAULT_ACCOUNT_VALUE);
    setEditingId(null);
    setIsAdding(true);
  };

  const startEdit = (account: Account) => {
    form.reset({
      phone: account.phone,
      iban: account.iban,
      label: account.label,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      extraInfo: account.extraInfo ?? '',
      type: account.type,
    });

    setEditingId(account.id);
    setIsAdding(false);
  };

  const cancel = () => {
    form.reset(DEFAULT_ACCOUNT_VALUE);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    toast.success(t.accountDeleted);
  };

  const { onUpdateStatus } = useUpdateAccountStatus();

  const handleToggle = (id: string, current: boolean) => {
    onUpdateStatus({ id, isActive: !current });
  };

  const handleAddAccount = async (
    data: TAccountSchema,
    newType: 'Bank' | 'Wallet',
  ) => {
    await onAdd({
      ...data,
      type: newType,
    });
    toast.success(t.accountAdded);
  };

  const save = form.handleSubmit(async (values) => {
    if (isAdding) {
      await onAdd(values);
      cancel();
      return;
    }

    if (editingId) {
      await onUpdate({ id: editingId, ...values });
      cancel();
    }
  });

  const remove = async (id: string) => {
    await onDelete(id);
  };

  return {
    handleToggle,
    handleDelete,
    handleAddAccount,

    defaultId,
    setDefaultId,
    editingId,
    setEditingId,

    form,
    startAdd,
    startEdit,
    save,
    remove,
    cancel,
    isAdding,
  };
};
