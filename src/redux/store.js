import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import request from './middlewares/request';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(request);
  },
});

const persistor = persistStore(store);

export { store, persistor };
