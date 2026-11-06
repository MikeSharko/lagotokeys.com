import { icons, type IconName } from "./icons";

type Props = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

// Decorative stroke icon; inherits color from `currentColor`
export function Icon({ name, size = 24, strokeWidth = 2, className }: Props) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={icons[name]} />
    </svg>
  );
}
