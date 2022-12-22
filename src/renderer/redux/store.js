import { configureStore } from '@reduxjs/toolkit'

import registerSlice from './registerSlice'


export const store = configureStore({
  reducer: {
    registerReducer: registerSlice,
  }
});
