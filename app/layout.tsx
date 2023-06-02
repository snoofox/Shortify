import '../styles/globals.css'
import { Poppins } from "next/font/google"

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });

export const metadata = {
  title: 'Shortify - The Ultimate URL Shortener',
  description: 'Shortify is a user-friendly URL shortening tool that lets you create custom, easy-to-remember links to share on social media, emails, and other online platforms',
  keywords: 'URL shortener, Short links, Custom URL, Link management, Digital marketing, Social media, Online platform, Simplify links, Easy-to-remember links'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
