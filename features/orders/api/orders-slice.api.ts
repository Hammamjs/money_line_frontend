import { baseApi } from '@/api/base-api';
import { orderKey } from '../constants/orders.constants';
import { Order, OrderStatusQuery } from '../types/orders.types';

export const OrdersSliceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrders: build.query<Order[], void>({
      query: () => '/orders/user',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => orderKey.details(id)), orderKey.list()]
          : [orderKey.list()],
      transformResponse: (orders: Order[]) =>
        orders.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
    }),
    getAllOrders: build.query<Order[], void>({
      query: () => '/orders',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => orderKey.details(id)), orderKey.list()]
          : [orderKey.list()],
      transformResponse: (orders: Order[]) => {
        console.log(orders);
        return orders;
      },
    }),
    updateOrderStatus: build.mutation<Order, OrderStatusQuery>({
      query: ({ id, status }) => ({
        url: `orders/update-status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, _err, { id }) => [orderKey.details(id)],
    }),
    createOrder: build.mutation<Order, FormData>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
} = OrdersSliceApi;
