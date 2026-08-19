import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/base-api';
import authReducerSlice from '@/features/auth/store/slices/auth-slice';
import { rtkErrorQueryLogger } from '@/middleware/rtk-query-err-logger.middleware';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducerSlice,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware, rtkErrorQueryLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
