export const useTransferQueryParam = () => {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  return {
    initialFrom: searchParams.get('from') || 'SDG',
    initialTo: searchParams.get('to') || 'CAD',
    initialAmount: searchParams.get('amount') || '100000',
  };
};
