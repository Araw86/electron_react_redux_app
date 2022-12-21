import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  registers: {
    GPIOA: {
      MODER: {
        address: "0x42020000",
        resetValue: "0xABFFFFFF",
        reavValue: null,
        description: "GPIO port mode register",
        registerBitList: ["MODE15", "MODE14", "MODE13", "MODE12", "MODE11", "MODE10", "MODE9", "MODE8", "MODE7", "MODE6", "MODE5", "MODE4", "MODE3", "MODE2", "MODE1", "MODE0"],
        registerBits: {}

      },
      OTYPER: {

      }
      // OSPEEDR
      // PUPDR
      // IDR
      // ODR
      // BSRR
      // LCKR
      // AFRL
      // AFRH
      // BRR
    }
  }
}

export const registerSlice = createSlice({
  name: 'stm32 registers',
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
export const { addRegisters, removeRegisters } = registerSlice.actions

export default registerSlice.reducer;