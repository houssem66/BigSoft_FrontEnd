import { configureStore } from '@reduxjs/toolkit'
import navigatorReducer from'./Navigator'
import tabReducer from'./Tab'
import GrossisteNavigatorReducer from './GrossisteNavigator'
import GrossisteTabReducer from './GrossisteTab'
export const store = configureStore({
  reducer: {navigator:navigatorReducer,
  tab:tabReducer,
  GrossisteTab:GrossisteTabReducer,
  GrossisteNavigator:GrossisteNavigatorReducer
},
 
})