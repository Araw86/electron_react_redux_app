import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  databaseLoaded: 0,
  configLoaded: 0
}

export const configurationSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addRegisters: (state, action) => {
      state.registers = { ...state.registers, ...action.payload };
    },
    removeRegisters: (state) => {
      state.registers = {};
    }
  }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { addRegisters, removeRegisters } = configurationSlice.actions

export default configurationSlice.reducer;