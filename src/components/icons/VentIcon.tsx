import type { SVGProps } from "react";

export function VentIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M12 20c-2.205-.48-9-4.24-9-11a5 5 0 0 1 9-3a5 5 0 0 1 9 3c0 6.76-6.795 10.52-9 11Zm0-2c3.12-.93 7-4.805 7-9a3 3 0 0 0-3-3c-1.305 0-2.638.833-4 2.5C10.638 6.833 9.305 6 8 6a3 3 0 0 0-3 3c0 4.195 3.88 8.07 7 9Z"
      ></path>
    </svg>
  );
}
