"use client"
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import theme from './theme';
type Props = {}

export default function ThemeRegistry({children}:{children:React.ReactNode}) {
    
  return (
     <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
}