import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-dm" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "AL_Saif Academy · Maths, AI & Technology",
  description: "Educational platform for Mathematics, AI, technology, admissions and student life. Make maths easy. Make technology useful.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dm.variable} ${mono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}