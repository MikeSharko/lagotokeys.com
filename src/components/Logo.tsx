import Link from "next/link";

// Three-key mark + wordmark from the mockup
export function Logo({ homeHref }: { homeHref: string }) {
  return (
    <Link href={homeHref} className="flex items-center gap-2.5 no-underline" aria-label="LegatoKeys home">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-end justify-center gap-[3px] rounded-[10px] bg-accent px-1.5 pb-[7px]"
      >
        <span className="h-[18px] w-[5px] rounded-sm bg-white" />
        <span className="mt-[7px] h-[11px] w-[5px] self-start rounded-sm bg-white" />
        <span className="h-[18px] w-[5px] rounded-sm bg-white" />
      </span>
      <span className="text-[22px] font-extrabold tracking-[-0.02em] text-accent">legatokeys</span>
    </Link>
  );
}
