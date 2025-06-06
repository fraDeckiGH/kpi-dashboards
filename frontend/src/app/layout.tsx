import type { Metadata } from "next"
import { Inter, Roboto_Mono } from 'next/font/google'
import "@/lib/styles/global.css"
import { Providers } from "@/lib/providers/Providers"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" 
      className={`
        ${inter.variable} ${roboto_mono.variable}
      `}
      suppressHydrationWarning 
    >
      <body
        className={`antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
