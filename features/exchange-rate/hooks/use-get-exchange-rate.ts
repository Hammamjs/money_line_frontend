import { skipToken } from '@reduxjs/toolkit/query';
import { useGetExchangeRatePairQuery } from '../api/exchange-rate-slice.api';

export const useGetExchangeRateQuery = (
  fromId: string | undefined,
  toId: string | undefined,
) => {
  const query =
    fromId && toId
      ? {
          fromId,
          toId,
        }
      : skipToken;

  const { data, isLoading, isError, error } =
    useGetExchangeRatePairQuery(query);

  return { data, isLoading, error, isError };
};
