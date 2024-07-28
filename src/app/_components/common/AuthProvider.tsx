"use client";

import { initialize } from "next/dist/server/lib/render-server";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {store} from "@/store/store"
import { getSession, userSelector } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { ClassNames } from "@emotion/react";
import { Box } from "@mui/material";
import Loading from "./Loading";

type Props = {};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
      store.dispatch(getSession())
  },[]);

  const path = usePathname();
  const router = useRouter();
  const userReducer = useSelector(userSelector);
  
  if(userReducer.isAuthenticating){
    return <Loading/>;
  }
  if(path !== "/login" && path !== "/register"){
    if(!userReducer.isAuthenticated){
      router.push('/login');
      return <Loading/>;
    }else if(path == "/"){
      router.push("/stock");
      return <Loading/>;
    }
  } else {
    if(userReducer.isAuthenticated){
      router.push('/stock');
      return <Loading/>;
    }
  }
  return <div>{children}</div>;
}
