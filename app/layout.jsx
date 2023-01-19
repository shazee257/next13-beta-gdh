// 'use client';

import './globals.css'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} text-[13px]`}>
      <head />
      <body>
        <div className='flex-1 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
