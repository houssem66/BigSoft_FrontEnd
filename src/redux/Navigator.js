import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "profile",
}


export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    change: (state,action) => {
      state.value=action.payload
      
    },
   
  },
})


// Action creators are generated for each case reducer function
export const { change } = navigatorSlice.actions

export default navigatorSlice.reducer