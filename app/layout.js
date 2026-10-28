import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = { title: "AL_Saif Academy · Maths, AI & Technology", description: "Educational platform for Mathematics, AI, technology, admissions and student life. Make maths easy. Make technology useful." };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}

