import type { Metadata } from "next";
// Manrope (the "Studio" design typeface), self-hosted from npm: latin + cyrillic, no Google request
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://legatokeys.com"),
  title: {
    default: "LegatoKeys — Private Piano Lessons in Rancho Peñasquitos, San Diego",
    template: "%s | LegatoKeys",
  },
  description:
    "Private one-on-one piano lessons at a home studio in Rancho Peñasquitos, San Diego. 30 and 60 minute lessons for students of all levels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
