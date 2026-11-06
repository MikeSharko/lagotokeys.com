// Shared <html>/<body> for the EN and RU root layouts
import "@fontsource-variable/manrope";
import "@/app/globals.css";
import type { Locale } from "@/i18n";

export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className="antialiased">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
