// css
import "./globals.css";
// next
import type { Metadata } from "next";
// providers
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ThemeProvider from "@/providers/ThemeProvider";
// fonts
import { Inter as FontSans } from "next/font/google";
// lib
import { cn } from "@/lib/utils";
// cmp
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "My Todos",
    template: "My Todos | %s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <ReactQueryClientProvider>
          <body
            className={cn(
              "bg-background dark:bg-dark1 dark:text-light1 min-h-screen font-sans antialiased",
              fontSans.variable
            )}
          >
            {children}
            <Toaster
              toastOptions={{
                className: "dark:bg-dark3 dark:text-light2",
              }}
            />
          </body>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
