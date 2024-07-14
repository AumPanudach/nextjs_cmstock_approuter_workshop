import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
type Props = {};

export default function Stock({}: Props) {
  return (
    <Box sx={{ mt: 1 }}>
      Stock
      <Image src="https://www.codemobiles.com/biz/images/codemobiles_logo.svg?ref=10" width={100} height={35} alt="logo" />
    </Box>
  );
}
