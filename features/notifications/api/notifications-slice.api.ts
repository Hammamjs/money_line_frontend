import { baseApi } from '@/api/base-api';
import { Notification } from '../types/notification.types';
import { notificationkey } from '../constants/notification.constants';
import { RootState } from '@/store/store';
import { io, Socket } from 'socket.io-client';

export const NotificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], void>({
      query: () => '/notification',
    }),
    notifyUsers: build.mutation<void, { message: string; title: string }>({
      query: ({ message, title }) => ({
        url: '/notifications/notify/users',
        method: 'POST',
        body: { message, title },
      }),
    }),
    notifyUser: build.mutation<
      Notification,
      { userId: string; title: string; message: string }
    >({
      query: (body) => ({
        url: '/notifications',
        method: 'POST',
        body,
      }),
    }),
    getUserNotification: build.query<Notification[], void>({
      query: () => '/notifications/user',

      onCacheEntryAdded: async (
        args,
        { cacheEntryRemoved, cacheDataLoaded, getState, updateCachedData },
      ) => {
        const token = (getState() as RootState).auth.accessToken;

        if (!token) return;

        const socket: Socket = io('http://localhost:3000', {
          auth: { token },
          transports: ['websocket'],
          autoConnect: true,
        });

        try {
          await cacheDataLoaded;

          socket.on('notifications', (data: Notification) => {
            updateCachedData((draft) => {
              if (!draft) return;
              draft.unshift({
                title: data.title,
                message: data.message,
                userId: data.userId ?? 'temp_user_id',
                id: data.id ?? 'tem_id',
                status: data.status ?? 'unread',
                createdAt: data.createdAt ?? new Date().toISOString(),
              });
            });
          });
        } catch (err) {
          console.log(err);
          throw err;
        } finally {
          await cacheEntryRemoved;

          socket.disconnect();
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((n) => notificationkey.details(n.id)),
              notificationkey.list(),
            ]
          : [notificationkey.list()],
    }),
    updateNotificatoins: build.mutation<Notification[], void>({
      query: () => ({
        url: '/notifications',
        method: 'PATCH',
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          NotificationsApi.util.updateQueryData(
            'getUserNotification',
            undefined,
            (draft) => {
              draft.forEach((n) => (n.status = 'read'));
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [notificationkey.list()],
    }),
    updateNotification: build.mutation<Notification, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          NotificationsApi.util.updateQueryData(
            'getUserNotification',
            undefined,
            (draft) => {
              const notification = draft.find((n) => n.id === id);
              if (notification) notification.status = 'read';
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        notificationkey.details(id),
      ],
    }),
    deleteNotification: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          NotificationsApi.util.updateQueryData(
            'getUserNotification',
            undefined,
            (draft) => {
              const index = draft.findIndex((n) => n.id === id);
              if (index) {
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

      invalidatesTags: (_result, _error, { id }) => [
        notificationkey.details(id),
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUserNotificationQuery,
  useNotifyUsersMutation,
  useUpdateNotificatoinsMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useNotifyUserMutation,
} = NotificationsApi;
