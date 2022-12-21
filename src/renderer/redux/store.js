import { configureStore } from '@reduxjs/toolkit'
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';

import registerSlice from './registerSlice'

const initialState = getInitialStateRenderer()

export const store = configureStore({
  reducer: {
    registerReducer: registerSlice,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().unshift(forwardToMain)
});

replayActionRenderer(store);