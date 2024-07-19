interface IcChevronDownProps {
  className?: string;
}

export default function IcChevronDown({ className }: IcChevronDownProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Pass className for potential styling
    >
      <g id="ic_32px">
        <path
          id="Vector 1843"
          d="M10 14L16 20L22 14"
          stroke="currentColor" // Use currentColor for stroke
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
