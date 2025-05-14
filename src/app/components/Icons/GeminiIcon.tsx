const GeminiIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#7050F0" }} />{" "}
        <stop offset="100%" style={{ stopColor: "#50D0F0" }} />{" "}
      </linearGradient>
    </defs>
    <path
      fill="url(#starGradient)"
      d="M12,0 Q17,7 24,12 Q17,17 12,24 Q7,17 0,12 Q7,7 12,0 Z"
    />
  </svg>
);

export default GeminiIcon;
