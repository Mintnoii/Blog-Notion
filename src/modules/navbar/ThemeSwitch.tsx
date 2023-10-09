"use client"
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import useHasMounted from '@/hooks/useHasMounted'
import {Button} from "@nextui-org/react"

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const hasMounted = useHasMounted()

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system')

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      aria-label={`switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
    >
      {hasMounted && (
        <>
          {isDarkTheme ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </>
      )}
    </Button>
  )
}
