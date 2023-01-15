import { configureStore } from '@reduxjs/toolkit'

import configurationSlice from './configurationSlice'
import downloadSlice from './downloadSlice';


export const store = configureStore({
  reducer: {
    configurationReducer: configurationSlice,
    downloadReducer: downloadSlice
  }
});
