import Link from "next/link";
import { BrandMark, Wordmark } from "./BrandMark";

// Notes mark + spaced-caps wordmark (chosen on the "LegatoKeys Logo" canvas)
export function Logo({ homeHref }: { homeHref: string }) {
  return (
    <Link href={homeHref} className="flex items-center gap-2.5 no-underline" aria-label="LegatoKeys home">
      <BrandMark size={36} className="shrink-0" />
      {/* Tighter tracking on the narrowest phones so the header stays one row */}
      <Wordmark className="text-[15px] tracking-[0.06em] min-[400px]:text-[17px] min-[400px]:tracking-[0.12em] sm:text-[19px]" />
    </Link>
  );
}
