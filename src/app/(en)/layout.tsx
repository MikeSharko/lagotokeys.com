import { RootDocument } from "@/components/RootDocument";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata;

// Root layout for the English site (served from /)
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
