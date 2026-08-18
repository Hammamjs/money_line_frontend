import { Account } from '@/features/accounts/types';
import { selectUser } from '@/features/auth/store/slices/auth-slice';
import { useTranslation } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Currency } from '../types/currency.types';
import { UseFormReturn } from 'react-hook-form';
import {
  CreateOrderSchema,
  TCreateOrderSchema,
} from '@/features/orders/schema';
import { useCreateOrderMutationAction } from '@/features/orders/hooks';

type Props = {
  fromCurrency: Currency | undefined;
  toCurrency: Currency | undefined;
  amount: string;
  convertedAmount: string;
  selectedAccount: Account | undefined;
  phone: string;
  form: UseFormReturn<TCreateOrderSchema>;

  setCopiedField: React.Dispatch<React.SetStateAction<string | null>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const useTransferActions = ({
  amount,
  convertedAmount,
  fromCurrency,
  setCopiedField,
  setStep,
  toCurrency,
  setImagePreview,
  form,
  selectedAccount,
}: Props) => {
  const { t } = useTranslation();

  const router = useRouter();

  const user = useSelector(selectUser);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(t.copied);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      form.setValue('transactionProof', file);
    } else {
      setImagePreview('');
      form.setValue('transactionProof', undefined);
    }
  };

  const handleNextStep2 = () => {
    const fromId = fromCurrency?.id;
    const toId = toCurrency?.id;
    const transactorUserId = selectedAccount?.userId;

    if (!fromId || !toId) {
      toast.error('Please select both currencies');
      return;
    }

    if (!transactorUserId) {
      toast.error('Please select an account/transactor');
      return;
    }

    form.setValue('fromAssetId', fromId, { shouldValidate: true });
    form.setValue('toAssetId', toId, { shouldValidate: true });
    form.setValue('transactorId', transactorUserId, { shouldValidate: true });

    const result = CreateOrderSchema.safeParse(form.getValues());

    if (result.error) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    setStep(3);
  };

  const { onCreate, isLoading: isOrderCreating } =
    useCreateOrderMutationAction();

  const handleConfirmAndSend = async (data: TCreateOrderSchema) => {
    if (!user || !selectedAccount) return;

    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {
      if (v === null || v === undefined || v === '') return;

      if (v instanceof FileList) {
        Array.from(v).forEach((file) => formData.append(k, file));
      } else if (v instanceof File) {
        formData.append(k, v);
      } else {
        formData.append(k, String(v));
      }
    });

    try {
      await onCreate(formData);
      const message =
        `Money Lite Transfer Request\n` +
        `Name: ${user.username}\n` +
        `Email: ${user.email}\n` +
        `WhatsApp: ${selectedAccount.phone}\n` +
        `Method: 'Money line'\n` +
        `From: ${amount} ${fromCurrency?.name}\n` +
        `To: ${convertedAmount} ${toCurrency?.name}`;

      window.open(
        `https://wa.me/${selectedAccount.phone}?text=${encodeURIComponent(message)}`,
        '_blank',
      );
      router.push(`/orders/${user.id}`);
    } catch {
      toast.error('Failed to save order');
    }
  };

  return {
    copyToClipboard,
    handleImageUpload,
    handleNextStep2,
    handleConfirmAndSend,
    isOrderCreating,
  };
};
