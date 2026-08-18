import { baseApi } from '@/api/base-api';
import { Account, AdminAccounts } from '../types';
import { accountkey } from '../constants';
import { TAccountSchema } from '@/features/accounts/schema';

export const AccountsSliceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserAccounts: build.query<Account[], void>({
      query: () => '/accounts/user',
      transformResponse: (res: { accounts: Account[] }) => {
        return res.accounts;
      },
      providesTags: (result) =>
        result
          ? [...result.map((a) => accountkey.details(a.id)), accountkey.list()]
          : [accountkey.list()],
    }),

    addAccount: build.mutation<Account, TAccountSchema>({
      query: (body) => ({
        url: '/accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [accountkey.list()],
    }),

    deleteAccount: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/accounts/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          AccountsSliceApi.util.updateQueryData(
            'getUserAccounts',
            undefined,
            (draft) => draft.filter((a) => a.id !== args.id),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_res, _err, { id }) => [
        accountkey.details(id),
        accountkey.list(),
      ],
    }),
    updateStatus: build.mutation<Account, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/accounts/${id}`,
        method: 'PATCH',
        body: { isActive },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          AccountsSliceApi.util.updateQueryData(
            'getUserAccounts',
            undefined,
            (draft) => {
              const target = draft.find((a) => a.id === args.id);
              if (target) {
                target.isActive = args.isActive;
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
    }),
    getAdminsAccounts: build.query<AdminAccounts[], void>({
      query: () => '/accounts/admin',
    }),

    updateAccount: build.mutation<
      AdminAccounts,
      Partial<TAccountSchema> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/accounts/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (_res, _err, { id }) => [
        accountkey.details(id),
        accountkey.list(),
      ],
    }),
    delete: build.mutation<AdminAccounts, { id: string }>({
      query: ({ id }) => ({
        url: `/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { id }) => [
        accountkey.details(id),
        accountkey.list(),
      ],
    }),
  }),
});

export const {
  useGetUserAccountsQuery,
  useAddAccountMutation,
  useDeleteAccountMutation,
  useUpdateStatusMutation,
  useGetAdminsAccountsQuery,
  useDeleteMutation,
  useUpdateAccountMutation,
} = AccountsSliceApi;
