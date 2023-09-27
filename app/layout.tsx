import './globals.css'
import type { Metadata } from 'next'
import TopNavbar from '../components/TopNavbar/TopNavbar'
import Provider from './Provider'
import Footer from '@/components/Footer/Footer'


export const metadata: Metadata = {
  title: 'Cinema Hub',
  description: 'Movie library using TMDP API',
  icons:{
    icon: "/favicn.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="en">
      <body>
        <Provider>
          <TopNavbar/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
