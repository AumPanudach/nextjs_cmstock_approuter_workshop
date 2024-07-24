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

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state) => {
      state.count++;
    }, 
  },
  extraReducers:(builder) => {
    builder.addCase(signUp.pending,(state)=>{
      state.status = "fetching";
    });
    builder.addCase(signUp.fulfilled,(state,action)=>
    {
        state.count++
        state.status = "success";
    })
  }
});

export default userSlices.reducer;
export const { add } = userSlices.actions;
export const userSelector = (state: RootState) => state.userReducer;
