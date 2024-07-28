import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as serverService from "@/services/serverService";
import { Pending } from "@mui/icons-material";
import httpClient from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";
import { stat } from "fs";
import { UserData } from "@/models/user.model";
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
  user?: UserData;
}

const initialState: UserState = {
  username: "",
  accessToken: "",
  status: "init",
  isAuthenticated: false,
  isAuthenticating: true,
  count: 0, 
};
//signUp or Register
export const signUp = createAsyncThunk(
  "user/signup",
  async (user: SignAction) => {
    // send username and password to backend
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await serverService.signUp(user);
    return response;
  }
);
//sigOut or Logout
export const signOut = createAsyncThunk("/user/signout", async () => {
  await serverService.signOut();
});
//signIn or Login
export const signIn = createAsyncThunk(
  "user/signin",
  async (user: SignAction) => {
    // send username and password to backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await serverService.signIn(user);
    if (response.result != "ok") {
      throw new Error("Login failed");
    }
    httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
      if (config && config.headers) {
        config.headers["Authorization"] = `Bearer ${response.token}`;
      }
      return config;
    });
    return response;
  }
);
// getSession
export const getSession = createAsyncThunk("/user/fetchSession", async () => {
  const response = await serverService.getSession();
  // set token
  if(response){
    httpClient.interceptors.request.use((config?:AxiosRequestConfig|any) => {
      if(config && config.headers && response.user){
        config.headers["Authorization"] = `Bearer ${response.user.token}`;
      }
      return config;
    })
  }
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
  extraReducers: (builder) => {
    //register state
    builder.addCase(signUp.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.count++;
      state.status = "success";
    });
    builder.addCase(signUp.rejected, (state) => {
      state.status = "failed";
    });

    //login state
    builder.addCase(signIn.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.count++;
      state.status = "success";
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.username = action.payload.username;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.status = "failed";
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    //signOut
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    //getSession 
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      if(action.payload && action.payload.user && action.payload.user.token){
        state.accessToken = action.payload.user.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    });
  },
});

export default userSlices.reducer;
export const { add } = userSlices.actions;
export const userSelector = (state: RootState) => state.userReducer;
