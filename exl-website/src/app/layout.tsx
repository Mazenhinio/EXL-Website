import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXL — A B2B Consultancy With Its Own Production Floor",
  description:
    "We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. From Dallas, for clients across North America and the Middle East.",
  icons: {
    icon: "/exl-icon.png",
    apple: "/exl-icon.png",
    shortcut: "/exl-icon.png",
  },
  openGraph: {
    title: "EXL — A B2B Consultancy With Its Own Production Floor",
    description:
      "Senior strategy, AI-native workflows, cinematic output. From Dallas, for clients across North America and the Middle East.",
    url: "https://exl.agency",
    siteName: "EXL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
