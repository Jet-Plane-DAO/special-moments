import { IconProps } from "./types";

export default function Chevron(props: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2.15906L13.4629 16.2673C14.3585 17.3695 14.3585 18.9486 13.4629 20.0508L2 34.1591"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
