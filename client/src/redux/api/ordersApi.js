import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { removeSession } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}admin/`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(removeSession()); 
  }

  return result;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getHistoryOrders: builder.query({
      query: () => 'history_transaction/',
      providesTags: ['Orders']
    }),
  })
});

export const { useGetHistoryOrdersQuery } = ordersApi;