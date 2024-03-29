import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateThree: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.77 10.512L14.138 12.024L12.53 13.488H4.346L2.978 12L4.61 10.512H12.77ZM3.218 0.743999L4.034 0H15.194L15.89 0.743999L13.466 2.976H5.258L3.218 0.743999ZM14.45 12.36L14.57 12.264H15.962L15.098 22.176L14.282 22.92L12.266 20.688L12.866 13.824L14.45 12.36ZM16.202 1.08L16.874 1.824L16.01 11.76H14.618L14.522 11.664L13.178 10.2L13.778 3.312L16.202 1.08ZM13.922 23.256L13.106 24H1.946L1.25 23.256L3.674 21.024H11.882L13.922 23.256Z"
      fill={color}
    />
  </svg>
);
