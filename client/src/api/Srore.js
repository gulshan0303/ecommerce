import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userReducers from "../features/user/userSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'


const persistConfig = {
    key:'root',
    storage
  }
  
  
  const rootReducer = combineReducers({
    user:userReducers
  })

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);






