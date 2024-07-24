"use client";
import {
  Box,
  CardContent,
  Card,
  Typography,
  CardMedia,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import * as Icons from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { add, signIn, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import Alert from '@mui/material/Alert';
type Props = {};

interface User {
  username: string;
  password: string;
}

export default function Login({}: Props) {
  const router = useRouter();
  const initialValue: User = { username: "admin", password: "" };
  const formValidateSchema = Yup.object().shape({
    username: Yup.string().required("Email is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  });
  const dispatch = useAppDispatch();
  const { control, handleSubmit,formState:{errors} } = useForm<User>({
    defaultValues: initialValue,
    resolver:yupResolver(formValidateSchema),
  });
  const reducer = useSelector(userSelector);
  const showForm = () => {
    return (
      <form onSubmit={handleSubmit(async (value : User) => {
        const result = await dispatch(signIn(value));
        if(signIn.fulfilled.match(result)){
         alert("This is a Login success")
        }else if(signIn.rejected.match(result)){
          //alert("This is a Login failed")
        }
      })}>
        {/*Username*/}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={(errors.username?.message ?? "")!=""}
              helperText={errors.username?.message?.toString()}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Email />
                  </InputAdornment>
                ),
              }}
              label="Username"
              autoComplete="email"
              autoFocus
            />
          )}
        />

        {/*Password*/}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={(errors.password?.message ?? "")!=""}
              helperText={errors.password?.message?.toString()}
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Password />
                  </InputAdornment>
                ),
              }}
              label="Password"
              autoComplete="password"
              autoFocus
            />
          )}
        />
        { reducer.status == "failed" && (
          <Alert severity="error">This is an error login.</Alert>
        )}
        <Button
          className="mt-8"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled = {
            reducer.status == "fetching"
          }
        >
          Login
        </Button>

        <Button
          className="mt-4"
          onClick={() => {
            dispatch(add());
            router.push("/register")}}
          type="button"
          fullWidth
          variant="outlined"
        >
          Register
        </Button>
      </form>
    );
  };
  return (
    <Box className="flex justify-center items-center">
      <Card className="max-w-[345px] mt-[100px]">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login ({reducer.count})
          </Typography>
          {showForm()}
        </CardContent>
      </Card>
      <style jsx global>
        {`
          body{
           min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url("/static/img/bg4.jpg");
            text-align: center;
          }
        `}
      </style>
    </Box>
  );
}