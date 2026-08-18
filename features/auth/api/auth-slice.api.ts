import { baseApi } from '@/api/base-api';
import { SignInQuery, AuthResult, SignUpQuery } from '../types';
import { logout, setCredentials } from '../store/slices/auth-slice';

export const SignInApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AuthResult, SignInQuery>({
      query: ({ email, password }) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: { email, password },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ ...data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: build.mutation<AuthResult, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ ...data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    signup: build.mutation<AuthResult, SignUpQuery>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ ...data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updatePassword: build.mutation<
      void,
      {
        newPassword: string;
        currentPassword: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: '/auth/update-password',
        method: 'PATCH',
        body,
      }),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/log-out',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        } finally {
          dispatch(logout());
        }
      },
    }),
    forgetPassword: build.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyCode: build.mutation<
      { message: string },
      { resetCode: string; email: string }
    >({
      query: (body) => ({
        url: '/auth/verify-code',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation<
      { message: string },
      { email: string; newPassword: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useRefreshMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdatePasswordMutation,
  // reset password
  useVerifyCodeMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = SignInApiSlice;
