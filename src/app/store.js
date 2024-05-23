import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./Slice/imageSlice"
export const store =  configureStore({
    reducer:imageReducer
})
