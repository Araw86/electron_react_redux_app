import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  databaseLoaded: 0,
  configLoadStatus: 0,

  sCubemxfinderPathValid: false,
  sCubemxfinderPath: null,
  bLocatedSqlFile: false,

  sMxRepPathValid: false,
  sMxRepPath: null,
  sDocFilterDevice: '',
  oSqlParsedData: null,
  bCacheUpdate: false,
  oMcuDataCache: null,

  bLoadDbFiles: false,
  aDbFiles: null

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
      // return state;
    },
    dispatchConfigurationProp: (state, action) => {
      const { sProp, oValue } = action.payload;
      state.configuration[sProp] = oValue;
      // return state;
    },

    dispatchStateProp: (state, action) => {
      const { sProp, oValue } = action.payload;
      state[sProp] = oValue;
    },

    confResetState: (state) => {
      console.log('Config reset')

      state.sCubemxfinderPath = null;
      state.sCubemxfinderPathValid = false;
      state.bLocatedSqlFile = false;
      state.sMxRepPathValid = false;
      state.sMxRepPath = null;
      state.oSqlParsedData = null;
      state.bCacheUpdate = false;
      state.oMcuDataCache = null;
      state.bLoadDbFiles = false;
      state.aDbFiles = null;
      // return state;
    }
  }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { dispatchConfiguration, dispatchConfigurationProp, confResetState, dispatchStateProp } = configurationSlice.actions

export default configurationSlice.reducer;