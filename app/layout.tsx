// css
import "./globals.css";
// next
import type { Metadata } from "next";
// fonts
import { Inter as FontSans } from "next/font/google";
// lib
import { cn } from "@/lib/utils";
// shadcn ui
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
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
      <ReactQueryClientProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
