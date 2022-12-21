'use client'

import { ThemeProvider } from 'next-themes'
import {NextUIProvider} from "@nextui-org/system"

export function Providers({ children }:{
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class">
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ThemeProvider>
  )
}