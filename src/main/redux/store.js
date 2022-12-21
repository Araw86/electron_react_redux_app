import { configureStore } from '@reduxjs/toolkit'
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';

import registerSlice from './registerSlice'

export const store = configureStore({
  reducer: {
    registerReducer: registerSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forwardToRenderer),
});

replayActionMain(store);