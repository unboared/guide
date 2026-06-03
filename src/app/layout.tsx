import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guide Unboared",
  description:
    "Tout ce qu'il faut pour animer avec Unboared. Installation, jeux, animation et dépannage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
