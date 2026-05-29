import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Muhammad Sarib Hanif | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Node.js, FastAPI, and DevOps. Building scalable applications and efficient APIs.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "FastAPI",
    "DevOps",
    "TypeScript",
  ],
  authors: [{ name: "Muhammad Sarib Hanif" }],
  openGraph: {
    title: "Muhammad Sarib Hanif | Full Stack Developer",
    description: "Full Stack Developer building scalable applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased bg-black text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
