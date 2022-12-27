import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  databaseLoaded: 0,
  configLoadStatus: 0
}

export const configurationSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    /**
     * store new configuration
     * @param {*} state 
     * @param {*} action 
     * @returns 
     */
    dispatchConfiguration: (state, action) => {
      state.configLoadStatus = action.payload.configLoadStatus;
      state.configuration = action.payload.configuration;
      return state;
    }
  }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { dispatchConfiguration } = configurationSlice.actions

export default configurationSlice.reducer;