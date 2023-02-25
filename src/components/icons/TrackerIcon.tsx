import type { SVGProps } from "react";

export function TrackerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.823 14.177a2 2 0 1 1-1-1l2.354-2.354a2 2 0 1 1 3.646 0l2.354 2.354a1.993 1.993 0 0 1 1.646 0l3.354-3.354a2 2 0 1 1 1 1l-3.354 3.354a2 2 0 1 1-3.646 0l-2.354-2.354a1.993 1.993 0 0 1-1.646 0l-2.354 2.354Z"
      ></path>
    </svg>
  );
}
