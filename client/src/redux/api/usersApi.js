import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './query/baseQuery';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth(`${import.meta.env.VITE_SERVER_URL}admin/`),
  tagTypes: ['Users', 'User', 'Orders'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'user/',
      providesTags: ['Users']
    }),
    getUserTransactions: builder.query({
      query: (id) => `user/transaction/${id}/`,
      providesTags: ['Orders']
    }),
    getUserInfo: builder.query({
      query: (id) => `user/${id}/`,
      providesTags: ['User']
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: 'user/create/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    editUserInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/update/${id}/`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    createTransaction: builder.mutation({
      query: (data) => ({
        url: `new_transaction/`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserTransactionsQuery,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useEditUserInfoMutation,
  useCreateTransactionMutation
} = usersApi;