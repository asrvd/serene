import type { SVGProps } from "react";

export function BackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M222 128a6 6 0 0 1-6 6H54.5l61.7 61.8a5.9 5.9 0 1 1-8.4 8.4l-72-72a5.8 5.8 0 0 1 0-8.4l72-72a5.9 5.9 0 0 1 8.4 8.4L54.5 122H216a6 6 0 0 1 6 6Z"
      ></path>
    </svg>
  );
}
