import type { Metadata } from 'next'
// import Navbar from '@/modules/navbar'
import Nav from '@/modules/nav/index'

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
    <html lang="en" suppressHydrationWarning className='scroll-smooth scroll-pt-16'>
      <body className='min-h-screen pb-12'>
        <Providers>
          <div className="flex flex-col ">
            <Nav/>
            {/* <Navbar /> */}
            <main className="flex w-full relative justify-center">
              {children}
            </main>
              {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  )
}
