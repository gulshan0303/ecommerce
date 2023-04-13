import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userReducers from "../features/user/userSlice"
import productReducers from "../features/product/ProductSlice"
import blogReducers from "../features/blog/blogSlice"
import contactReducers from "../features/contact/contactSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'


const persistConfig = {
    key:'root',
    storage
  }
  
  
  const rootReducer = combineReducers({
    user:userReducers,
    products:productReducers,
    blogs:blogReducers,
    contacts:contactReducers
  })

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);






