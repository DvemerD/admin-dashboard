import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './query/baseQuery';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth(`${import.meta.env.VITE_SERVER_URL}admin/`),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getHistoryOrders: builder.query({
      query: () => 'history_transaction/',
      providesTags: ['Orders']
    }),
  })
});

export const { useGetHistoryOrdersQuery } = ordersApi;