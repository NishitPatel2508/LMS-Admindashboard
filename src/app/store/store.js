import { configureStore } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import imageReducer from "../Slice/imageSlice"
import storage from 'redux-persist/lib/storage'
import authReducer from "../Slice/authSlice"
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
    key:"root",
    version:1,
    storage
}

const persistedReducer = persistReducer(persistConfig,authReducer)
export const store =  configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     serializableCheck: false
    }),
})
export const persistor = persistStore(store)
