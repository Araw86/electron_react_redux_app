import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  databaseLoaded: 0,
  configLoadStatus: 0,

  bLocatedFileMcuDocs: 0,
  bLocatedFileMcuFeatures: 0
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
    },
    dispatchConfigurationProp: (state, action) => {
      const { sProp, oValue } = action.payload;
      state.configuration[sProp] = oValue;
      return state;
    },

    confResetState: (state) => {
      state.bLocatedFileMcuDocs++;
      state.bLocatedFileMcuFeatures++;
      return state;
    }
  }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { dispatchConfiguration, dispatchConfigurationProp, confResetState } = configurationSlice.actions

export default configurationSlice.reducer;