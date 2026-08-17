import { useState } from 'react';

export const useTransferUi = () => {
  const [step, setStep] = useState(1);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  return {
    step,
    setStep,
    selectedAccountId,
    setSelectedAccountId,
    copiedField,
    setCopiedField,
  };
};
