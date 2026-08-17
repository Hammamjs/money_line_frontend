import { baseApi } from '@/api/base-api';
import { User } from '../types/users.types';
import { usersKey } from '../constants/users.constants';
import { Role } from '@/features/auth/types';

export const UsersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<User[], { role?: Role } | void>({
      query: (params) => ({
        url: '/users',
        params: params || {},
      }),
      transformResponse: (data: { users: User[] }) => data.users,
      providesTags: [usersKey.list()],
    }),
    updateUser: build.mutation<User, { username: string; id: string }>({
      query: ({ id, username }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: { username },
      }),
    }),
    updateUserRole: build.mutation<
      User,
      { id: string; role: 'user' | 'admin' }
    >({
      query: (body) => ({
        url: '/users/update/role',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        usersKey.details(id),
        usersKey.list(),
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
} = UsersApiSlice;
