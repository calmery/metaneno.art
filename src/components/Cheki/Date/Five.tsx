import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateFive: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.242 10.512L14.61 12.024L13.002 13.488H4.818L3.45 12L5.082 10.512H13.242ZM3.138 11.64L3.018 11.76H1.65L2.514 1.824L3.33 1.08L5.346 3.312L4.746 10.176L3.138 11.64ZM3.69 0.743999L4.506 0H15.666L16.362 0.743999L13.938 2.976H5.73L3.69 0.743999ZM14.922 12.36L15.042 12.264H16.434L15.57 22.176L14.754 22.92L12.738 20.688L13.338 13.824L14.922 12.36ZM14.394 23.256L13.578 24H2.418L1.722 23.256L4.146 21.024H12.354L14.394 23.256Z"
      fill={color}
    />
  </svg>
);
