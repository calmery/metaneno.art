import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateZero: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.15 11.64L3.03 11.76H1.662L2.526 1.824L3.342 1.08L5.358 3.312L4.758 10.176L3.15 11.64ZM1.422 22.92L0.75 22.176L1.614 12.24H3.006L3.102 12.36L4.446 13.824L3.846 20.688L1.422 22.92ZM3.702 0.743999L4.518 0H15.678L16.374 0.743999L13.95 2.976H5.742L3.702 0.743999ZM14.934 12.36L15.054 12.264H16.446L15.582 22.176L14.766 22.92L12.75 20.688L13.35 13.824L14.934 12.36ZM16.686 1.08L17.358 1.824L16.494 11.76H15.102L15.006 11.664L13.662 10.2L14.262 3.312L16.686 1.08ZM14.406 23.256L13.59 24H2.43L1.734 23.256L4.158 21.024H12.366L14.406 23.256Z"
      fill={color}
    />
  </svg>
);