interface IcChevronUpdown {
  className?: string;
}

export default function IcChevronUpdown({ className }: IcChevronUpdown) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Group 33919">
        <path
          id="Vector 1843"
          d="M1 13L6 18L11 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          id="Vector 1844"
          d="M11 7L6 2L1 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path id="Vector 1845" d="M6 18V2.5" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
