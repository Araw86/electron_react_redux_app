import { configureStore } from '@reduxjs/toolkit'

import configurationSlice from './configurationSlice'


export const store = configureStore({
  reducer: {
    configurationReducer: configurationSlice,
  }
});
