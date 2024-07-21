import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as serverService from "@/services/serverService";
interface SignAction {
  username: string;
  password: string;
}
export const signUp = createAsyncThunk("user/signup", async (user: SignAction) => {
  // send username and password to backend
  const response = await serverService.signUp(user);
  return response;
});
const userSlices = createSlice({
  name: "user",
  initialState: { count: 10 },
  reducers: {
    add: (state) => {
      state.count++;
    }, 
  },
  extraReducers:(builder) => {
    builder.addCase(signUp.fulfilled,(state,action)=>
    {
        state.count++
    })
  }
});

export default userSlices.reducer;
export const { add } = userSlices.actions;
export const userSelector = (state: RootState) => state.userReducer;
