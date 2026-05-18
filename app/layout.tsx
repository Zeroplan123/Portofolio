import type { Metadata } from "next";
import "./globals.css";
import ThemeInit from "@/components/theme/ThemeInit";
import BackgroundFX from "@/components/visual/BackgroundFX";
import CustomCursor from "@/components/visual/CustomCursor";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio — modern, clean, futuristic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased"
    >
      <head>
        <ThemeInit />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <BackgroundFX />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
