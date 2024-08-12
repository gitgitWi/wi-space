import type { Metadata } from "next";

import { notoSansKr } from "~/components/fonts";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wi' space",
  description: "Workspace for Me, Wi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(notoSansKr.className, "min-w-[400px]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
