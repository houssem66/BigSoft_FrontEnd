import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const GrossisteTabSlice = createSlice({
  name: 'GrossiteTab',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.value=action.payload
   
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { increment } = GrossisteTabSlice.actions

export default GrossisteTabSlice.reducer