import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { DM_Sans } from "next/font/google";
import QueryProvider from "@/components/query-provider";
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Todo.easy - your daily todos",
  description: "Todo.easy is a simple todo app that helps you to manage your daily tasks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <main className="min-h-screen flex flex-col">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
