import { Mutex } from 'async-mutex';
import { SerializedError } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { accountkey } from '@/features/accounts/constants';
import { logout, setCredentials } from '@/features/auth/store';
import { AuthResult } from '@/features/auth/types';
import { currenciesKey } from '@/features/currency/constants';
import { rateKey } from '@/features/exchange-rate/constants';
import { notificationkey } from '@/features/notifications/constants';
import { orderKey } from '@/features/orders/constants';
import { usersKey } from '@/features/users/constants';
import { RootState } from '@/store/store';
import { relative } from 'path';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/api';

const fetchQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});
const mutex = new Mutex();

const fetchQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | SerializedError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await fetchQuery(args, api, extraOptions);

  if (result.error && 'status' in result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log('Sending refresh token');
        const refreshResult = await fetchQuery(
          { url: '/auth/refresh', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          console.log('Updating token');
          api.dispatch(
            setCredentials({ ...(refreshResult.data as AuthResult) }),
          );
          result = await fetchQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await fetchQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchQueryWithReauth,

  tagTypes: [
    rateKey.type,
    orderKey.type,
    currenciesKey.type,
    usersKey.type,
    notificationkey.type,
    accountkey.type,
  ],

  endpoints: () => ({}),
});
