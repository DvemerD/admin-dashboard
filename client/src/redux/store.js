import { configureStore } from '@reduxjs/toolkit';
import auth from './features/authSlice';
import { ordersApi } from './api/ordersApi';
import { authApi } from './api/authApi';
import { ratesApi } from './api/ratesApi';
import { commentsApi } from './api/commentsApi';
import { usersApi } from './api/usersApi';

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...[
        ordersApi.middleware,
        authApi.middleware,
        ratesApi.middleware,
        commentsApi.middleware,
        usersApi.middleware
      ]
    ),
  devTools: import.meta.env.VITE_DEV_MODE !== "production",
})