import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Pro } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Programa Espiritual",
  description: "Um programa espiritual de transformação pessoal em 63 dias",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${crimsonPro.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
