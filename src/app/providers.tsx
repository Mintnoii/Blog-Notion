'use client'

import "./globals.css"
import { ThemeProvider } from 'next-themes'
import {NextUIProvider} from "@nextui-org/react"

export function Providers({ children }:{
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}