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
    getFacture: builder.query({
      query: ({ id, sold }) => ({
        url: `transaction-requests/${id}/download/`,
        method: 'GET',
        responseHandler: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${sold ? `Vydana${transaction_id}.pdf` : 'Fakture.zip'}`);
          link.click();
          window.URL.revokeObjectURL(url);
        },
      }),
    }),
  })
});

export const { 
  useGetHistoryOrdersQuery,
  useGetFactureQuery
 } = ordersApi;