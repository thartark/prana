import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/sonner"
import { studioConfig } from "@/lib/studio-config"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: {
    default: `${studioConfig.name} | ${studioConfig.city}`,
    template: `%s · ${studioConfig.shortName}`,
  },
  description: studioConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MainNav />
          <div className="flex-1">{children}</div>
          <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground/70">
                Built by {studioConfig.builtBy}
              </p>
            </div>
          </footer>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
