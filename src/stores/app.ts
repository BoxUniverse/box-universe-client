import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage,

  blacklist: ['modalSlice'],
  // transforms: [
  //   encryptTransform({
  //     secretKey: 'boxuniverse',
  //     onError: function (error) {
  //       // Handle the error.
  //     },
  //   }),
  // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store, {});
export const state = store.getState();
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export default store;
export const wrapper = createWrapper(() => store);
