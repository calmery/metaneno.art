import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateSeven: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.688 11.64L2.568 11.76H1.2L2.064 1.824L2.88 1.08L4.896 3.312L4.296 10.176L2.688 11.64ZM3.24 0.743999L4.056 0H15.216L15.912 0.743999L13.488 2.976H5.28L3.24 0.743999ZM14.472 12.36L14.592 12.264H15.984L15.12 22.176L14.304 22.92L12.288 20.688L12.888 13.824L14.472 12.36ZM16.224 1.08L16.896 1.824L16.032 11.76H14.64L14.544 11.664L13.2 10.2L13.8 3.312L16.224 1.08Z"
      fill={color}
    />
  </svg>
);
