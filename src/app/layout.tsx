import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Providers } from '@/app/providers'
// import Footer from '~/components/ui/Footer'
// import { ScrollToTop } from '../features/scroll'
// import DropMenu from './DropMenu'
// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import { navigation } from '~/data/nav'

export const metadata: Metadata = {
  title: 'Mintnoii\'s Site',
  description: 'Mintnoii\'s Site',
}

// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Providers>
          <div className="flex flex-col min-h-screen items-center">
            <Navbar />
            <main className="flex flex-col max-w-sm w-full justify-center  md:max-w-md lg:max-w-lg xl:max-w-xl">
              {children}
            </main>
            {/* <Footer /> */}
        </div>
        </Providers>
      </body>
    </html>
  )
}
