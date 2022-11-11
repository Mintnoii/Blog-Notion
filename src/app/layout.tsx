import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
// import Footer from '~/components/ui/Footer'
// import { ScrollToTop } from '../features/scroll'
// import DropMenu from './DropMenu'
// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import { navigation } from '~/data/nav'
const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen  bg-zinc-200 items-center dark:bg-black">
          <Navbar />
          <main className="flex flex-col max-w-sm  bg-zinc-200 justify-center  md:max-w-md lg:max-w-lg xl:max-w-xl dark:bg-black">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  )
}
