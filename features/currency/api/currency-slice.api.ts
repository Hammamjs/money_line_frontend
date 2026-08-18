import { baseApi } from '@/api/base-api';
import { CurrencyQuery, Currency } from '../types/currency.types';
import { currenciesKey } from '../constants/index';

export const CurrencySliceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query<Currency[], void>({
      query: () => '/currency',
      providesTags: [currenciesKey.list()],
    }),

    addCurrency: build.mutation<Currency, CurrencyQuery>({
      query: (body) => ({
        url: '/currency',
        method: 'POST',
        body,
      }),

      invalidatesTags: [currenciesKey.list()],

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          CurrencySliceApi.util.updateQueryData(
            'getCurrencies',
            undefined,
            (draft) => {
              draft.push({
                id: 'Temp_id',
                ...args,
                isActive: true,
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
    }),

    updateCurrency: build.mutation<Currency, { isActive: boolean; id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `currency/${id}`,
          method: 'PATCH',
          body,
        }),

        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          const patch = dispatch(
            CurrencySliceApi.util.updateQueryData(
              'getCurrencies',
              undefined,
              (draft) => {
                const currency = draft.find((c) => c.id === args.id);
                if (currency) {
                  currency.isActive = args.isActive;
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

        invalidatesTags: [currenciesKey.list()],
      },
    ),

    deleteCurrency: build.mutation<Currency, { id: string }>({
      query: ({ id }) => ({
        url: `/currency/${id}`,
        method: 'DELETE',
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          CurrencySliceApi.util.updateQueryData(
            'getCurrencies',
            undefined,
            (draft) => {
              const index = draft.findIndex((c) => c.id === args.id);
              draft.splice(index, 1);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },

      invalidatesTags: () => [currenciesKey.list()],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useAddCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
} = CurrencySliceApi;
