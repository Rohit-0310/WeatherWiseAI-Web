import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "@/shared/components/layout/TopNav";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { MobileNav } from "@/shared/components/layout/MobileNav";



const inter = localFont({
  src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "WeatherWiseAI",
  description: "Premium AI-powered weather dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary/30`}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <MobileNav />
            <div className="flex-1 flex flex-col md:ml-[80px] min-w-0">
              <TopNav />
              <main className="flex-1 flex flex-col pt-4 pb-24 md:pb-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
