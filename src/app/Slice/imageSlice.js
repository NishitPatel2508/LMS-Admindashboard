import {createSlice,nanoid} from "@reduxjs/toolkit"

const initialState = {
    images:{ id:1, image:"/assets/user.png"}
}

export const imageSlice = createSlice({
    name:"image",
    initialState,
    reducers: {
        addImage : (state,action) =>{
            const image = {
                id:nanoid,
                image: action.payload
            }
            state.images.push(image)
        }
    }
})

export const {addImage} = imageSlice.actions;

export default imageSlice.reducer