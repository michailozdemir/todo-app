import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Todo.easy - your daily todos",
  description: "Todo.easy is a simple todo app that helps you to manage your daily tasks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <main className="flex flex-col min-h-screen">
            <Header />
            <main className="flex justify-center flex-1">{children}</main>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
