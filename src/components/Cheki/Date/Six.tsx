import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateSix: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.704 10.512L15.072 12.024L13.464 13.488H5.28L3.912 12L5.544 10.512H13.704ZM3.6 11.64L3.48 11.76H2.112L2.976 1.824L3.792 1.08L5.808 3.312L5.208 10.176L3.6 11.64ZM1.872 22.92L1.2 22.176L2.064 12.24H3.456L3.552 12.36L4.896 13.824L4.296 20.688L1.872 22.92ZM4.152 0.743999L4.968 0H16.128L16.824 0.743999L14.4 2.976H6.192L4.152 0.743999ZM15.384 12.36L15.504 12.264H16.896L16.032 22.176L15.216 22.92L13.2 20.688L13.8 13.824L15.384 12.36ZM14.856 23.256L14.04 24H2.88L2.184 23.256L4.608 21.024H12.816L14.856 23.256Z"
      fill={color}
    />
  </svg>
);