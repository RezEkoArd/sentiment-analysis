import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Sentiment Analysis App",
  description: "Analyze text sentiment using SVM and Naive Bayes models. Built with Next.js.",
  keywords: "Sentiment Analysis, SVM, Naive Bayes, Machine Learning, Text Analysis, Next.js",
  author: "Rezekoard",
  applicationName: "Sentiment Analysis App",
  // robots: "index, follow",
  // themeColor: "#ffffff",
  charset: "UTF-8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
