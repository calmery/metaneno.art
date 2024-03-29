import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateFour: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.792 10.432L14.16 11.944L12.552 13.408H4.368L3 11.92L4.632 10.432H12.792ZM2.688 11.56L2.568 11.68H1.2L2.064 1.744L2.88 1L4.896 3.232L4.296 10.096L2.688 11.56ZM14.472 12.28L14.592 12.184H15.984L15.12 22.096L14.304 22.84L12.288 20.608L12.888 13.744L14.472 12.28ZM16.224 1L16.896 1.744L16.032 11.68H14.64L14.544 11.584L13.2 10.12L13.8 3.232L16.224 1Z"
      fill={color}
    />
  </svg>
);
