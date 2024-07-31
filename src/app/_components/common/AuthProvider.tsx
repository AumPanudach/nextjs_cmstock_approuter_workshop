"use client";

import React, { useEffect } from "react";
import {store} from "@/store/store"
import { getSession } from "@/store/slices/userSlice";

type Props = {};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
      store.dispatch(getSession())
  },[]);


  
  return <div>{children}</div>;
}
