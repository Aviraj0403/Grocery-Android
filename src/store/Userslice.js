import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id : "",
    name:"",
    email:"",
}

const Userslice = createSlice({
    name : "user",
    initialState : initialValue,
    reducers : {
        setUserDetails : (state,action) =>{
            state = {...action.payload}
        }
    }
})

 export const {setUserDetails} = Userslice.actions

 export default Userslice.reducer
 