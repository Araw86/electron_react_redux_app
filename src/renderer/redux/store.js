import { configureStore } from '@reduxjs/toolkit'

import registerSlice from './registerSlice'
import configurationSlice from './configurationSlice'


export const store = configureStore({
  reducer: {
    configurationReducer: configurationSlice,
  }
});
