"use client"
import React from "react";
import { Box } from "@mui/material";
export const dynamic = "force-dynamic";
import Header from "../_components/layout/Header";
import Sidebar from "../_components/layout/Sidebar";
import DrawerHeader from "../_components/layout/DraweHeader";
type Props = {
  children: React.ReactNode;
};

export default function Defaultlayout({children}: Props) {
const [open,setOpen] = React.useState(true);
const handleDrawerOpen = () => {
  setOpen(true)
};
const handleDrawerClose = () => {
  setOpen(false)
};
////////////////////////////////////////////////////////
 return (<section>
    <Box sx={{display:"flex"}}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
        <Box component="main" sx={{flexGrow:1,p:3}}>
          <DrawerHeader/>
            {children}
        </Box>
    </Box>
  </section>);
}
