import React from 'react';

const BrainLogo = ({ size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brain AI Logo"
      role="img"
    >
      {/* Brain outline */}
      <path
        d="M32 2C20 2 12 10 12 22c0 6 4 12 8 14v10c0 4 4 8 8 8s8-4 8-8V36c4-2 8-8 8-14 0-12-8-20-20-20z"
        stroke="white"
        strokeWidth="3"
        fill="black"
      />
      {/* Brain nerves */}
      <path
        d="M20 22c0 4 4 6 8 6s8-2 8-6M28 22v18M36 22v18M24 30h16M20 38h24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BrainLogo;
