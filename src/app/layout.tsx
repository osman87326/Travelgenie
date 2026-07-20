import type { Metadata } from "next";
import "./../index.css";
import "./../App.css";

export const metadata: Metadata = {
  title: "TravelGenie",
  description: "AI-powered travel planning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
