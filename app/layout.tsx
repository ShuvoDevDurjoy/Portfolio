import type { ReactNode } from "react";
import { Geist, Geist_Mono, Space_Grotesk, Space_Mono } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html className = {`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`} lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}