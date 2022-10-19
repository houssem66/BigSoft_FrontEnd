import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.value=action.payload
   
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { increment } = tabSlice.actions

export default tabSlice.reducer