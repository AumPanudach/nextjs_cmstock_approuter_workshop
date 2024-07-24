import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as serverService from "@/services/serverService";
import { Pending } from "@mui/icons-material";
interface SignAction {
  username: string;
  password: string;
}

interface UserState {
  username: string;
  accessToken: string;
  error?: string;
  status: "fetching" | "success" | "failed" | "init";
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  count: 0;
}

const initialState:UserState = {
  username:"",
  accessToken:"",
  status:"init",
  isAuthenticated:false,
  isAuthenticating:true,
  count:0,
}

export const signUp = createAsyncThunk("user/signup", async (user: SignAction) => {
  // send username and password to backend
  await new Promise((resolve) => setTimeout(resolve,2000)); 
  const response = await serverService.signUp(user);
  return response;
});

export const signIn = createAsyncThunk("user/signin", async (user: SignAction) => {
  // send username and password to backend
  await new Promise((resolve) => setTimeout(resolve,1000)); 
  const response = await serverService.signIn(user);
  return response;
});

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state) => {
      state.count++;
    }, 
  },
  extraReducers:(builder) => {
    //register state
    builder.addCase(signUp.pending,(state)=>{
      state.status = "fetching";
    });
    builder.addCase(signUp.fulfilled,(state,action)=>
    {
        state.count++
        state.status = "success";
    })
    builder.addCase(signUp.rejected, (state) =>{

      state.status = "failed";
    }) 

    //login state
    builder.addCase(signIn.pending,(state)=>{
      state.status = "fetching";
    });
    builder.addCase(signIn.fulfilled,(state,action)=>
    {
        state.count++
        state.status = "success";
    })
    builder.addCase(signIn.rejected, (state) =>{

      state.status = "failed";
    }) 
  }
});

export default userSlices.reducer;
export const { add } = userSlices.actions;
export const userSelector = (state: RootState) => state.userReducer;
