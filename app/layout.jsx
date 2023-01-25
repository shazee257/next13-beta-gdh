
import './globals.css'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} text-sm`}>
      <head />
      <body>
        <div className={`${poppins.className} text-sm flex-1 min-h-screen`}>
          {children}
        </div>
      </body>
    </html>
  )
}
