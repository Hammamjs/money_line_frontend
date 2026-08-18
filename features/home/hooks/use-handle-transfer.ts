import { useRouter } from 'next/navigation';
import { Currency } from '@/features/currency/types';

type handleTransferProps = {
  toCurrency: Currency | null;
  fromCurrency: Currency | null;
  fromAmount: string;
};

export const useHandleTransfer = ({
  fromAmount,
  toCurrency,
  fromCurrency,
}: handleTransferProps) => {
  const router = useRouter();

  const handleTransfer = () =>
    router.push(
      `/transfer?to=${toCurrency?.code}&from=${fromCurrency?.code}&amount=${fromAmount}`,
    );

  return {
    handleTransfer,
  };
};
