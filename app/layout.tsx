import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Pooja ❤️",
  description: "A little birthday surprise for Pooja.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
