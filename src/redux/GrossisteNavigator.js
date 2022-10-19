import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "profile",
}


export const GrossisteNavigatorSlice = createSlice({
  name: 'GrossisteNavigator',
  initialState,
  reducers: {
    change: (state,action) => {
      state.value=action.payload
      
    },
   
  },
})


// Action creators are generated for each case reducer function
export const { change } = GrossisteNavigatorSlice.actions

export default GrossisteNavigatorSlice.reducer