import React from "react";
import { Box } from "@mui/material";
export const dynamic = "force-dynamic";
type Props = {
  children: React.ReactNode;
};

export default function Defaultlayout({children}: Props) {
  return <section>
    <Box sx={{display:"flex"}}>
        <Box component="main" sx={{flexGrow:1,p:3}}>
            {children}
        </Box>
    </Box>
  </section>;
}
