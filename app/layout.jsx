
import './globals.css'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <head />
      <body className={`${poppins.className} text-[13px]`}>
        <div className='flex-1 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
