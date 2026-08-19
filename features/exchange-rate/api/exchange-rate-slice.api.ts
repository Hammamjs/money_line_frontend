import { baseApi } from '@/api/base-api';
import {
  AddExchangeRateQuery,
  ExchangeRateQuery,
  ExchangeRateResult,
} from '../types/exchange-rate.types';
import { rateKey } from '../constants';

export const ExchangeRateSliceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExchangeRatePair: build.query<ExchangeRateResult, ExchangeRateQuery>({
      query: (params) => ({
        url: '/exchange-rate/rate',
        params,
      }),
      providesTags: (_errors, _result, { fromId, toId }) => [
        rateKey.details(fromId, toId),
      ],
    }),
    getAllExchangeRate: build.query<ExchangeRateResult[], void>({
      query: () => '/exchange-rate',
      providesTags: [rateKey.list()],
    }),
    addExchangeRate: build.mutation<ExchangeRateResult, AddExchangeRateQuery>({
      query: (body) => ({
        url: 'exchange-rate',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          ExchangeRateSliceApi.util.updateQueryData(
            'getAllExchangeRate',
            undefined,
            (draft) => {
              draft.push({
                id: 'temp-id',
                fromCurrency: {} as any,
                toCurrency: {} as any,
                fromCurrencyId: args.toCurrencyId,
                toCurrencyId: args.toCurrencyId,
                isActive: true,
                rate: args.rate,
                createdAt: new Date().toISOString() as unknown as Date,
                updatedAt: new Date().toISOString() as unknown as Date,
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [rateKey.list()],
    }),
    updateExchangeRate: build.mutation<
      ExchangeRateResult,
      { isActive: boolean; id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/exchange-rate/${id}`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          ExchangeRateSliceApi.util.updateQueryData(
            'getAllExchangeRate',
            undefined,
            (draft) => {
              const rate = draft.find((r) => r.id === args.id);
              if (rate) {
                rate.isActive = args.isActive;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [rateKey.list()],
    }),
    deleteExchangeRate: build.mutation<ExchangeRateResult, { id: string }>({
      query: ({ id }) => ({
        url: `exchange-rate/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          ExchangeRateSliceApi.util.updateQueryData(
            'getAllExchangeRate',
            undefined,
            (draft) => {
              const index = draft.findIndex((r) => r.id === args.id);

              if (index != -1) {
                draft.splice(index, 1);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [rateKey.list()],
    }),
  }),
});

export const {
  useGetExchangeRatePairQuery,
  useGetAllExchangeRateQuery,
  useAddExchangeRateMutation,
  useDeleteExchangeRateMutation,
  useUpdateExchangeRateMutation,
} = ExchangeRateSliceApi;
