import {createSlice} from "@reduxjs/toolkit"
const initialState ={
    users:"",
    accessToken:""
}

export const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action) =>{
            state.users = action.payload.user.email
            state.accessToken = action.payload.accessToken
        },
        logout: () => initialState
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer