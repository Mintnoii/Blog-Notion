"use client"
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import useHasMounted from '@/hooks/useHasMounted'

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const hasMounted = useHasMounted()

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system')

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')

  return (
    <button
      className="rounded-md cursor-pointer flex bg-zinc-300 h-8 mx-1 p-2 transition ease-in-out ring-neutral-400 w-8 duration-200 items-center justify-center dark:bg-zinc-700 hover:bg-zinc-300 hover:ring-2 dark:hover:bg-zinc-800 "
      type="button"
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
    </button>
  )
}
