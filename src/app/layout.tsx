import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "@/shared/components/layout/TopNav";
import { Sidebar } from "@/shared/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

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
            <div className="flex-1 flex flex-col lg:ml-[80px] min-w-0">
              <TopNav />
              <main className="flex-1 flex flex-col pt-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
