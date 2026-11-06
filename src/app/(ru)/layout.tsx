import { RootDocument } from "@/components/RootDocument";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata;

// Root layout for the Russian site (served from /ru/)
export default function RussianLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ru">{children}</RootDocument>;
}
