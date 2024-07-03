"use client";
import React from "react";
import { useRouter } from "next/navigation";
type Props = {};

export default function dashboard({}: Props) {
  const router = useRouter();
  return (
    <div>
      <b>dashboard</b>
      <br />
      <button type="button" onClick={() => {
        router.push("/examples/aboutus")
      }}>Dashboard Btn</button>
    </div>
  );
}
