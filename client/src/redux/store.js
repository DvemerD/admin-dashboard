import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './api/ordersApi';
import { authApi } from './api/authApi';
import { ratesApi } from './api/ratesApi';
import auth from './features/authSlice';

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
    auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        ...[ordersApi.middleware, authApi.middleware, ratesApi.middleware]
      ),
  devTools: import.meta.env.VITE_DEV_MODE !== "production",
})