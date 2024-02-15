import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './api/ordersApi';
import { authApi } from './api/authApi';
import auth from './features/authSlice';

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        ...[ordersApi.middleware, authApi.middleware]
      ),
  devTools: import.meta.env.VITE_DEV_MODE !== "production",
})