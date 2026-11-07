import Link from "next/link";
import { BrandMark, Wordmark } from "./BrandMark";

// Notes mark + spaced-caps wordmark (chosen on the "LegatoKeys Logo" canvas)
export function Logo({ homeHref }: { homeHref: string }) {
  return (
    <Link href={homeHref} className="flex items-center gap-2.5 no-underline" aria-label="LegatoKeys home">
      <BrandMark size={36} />
      <Wordmark className="text-[17px] sm:text-[19px]" />
    </Link>
  );
}
