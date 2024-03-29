import { css } from "@emotion/react";
import React from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

export const ChekiButton: React.FC<{
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
}> = ({ children, disabled, id, onClick }) => (
  <div
    css={css`
      ${Typography.M};
      color: ${Colors.white};
      display: flex;
      justify-content: center;
      height: ${Spacing.m * 2 + 14}px;
      line-height: 14px;
      user-select: none;
      width: 100%;
    `}
  >
    <button
      className="h-full rounded-full w-full"
      css={css`
        background: ${GradientColors.pinkToOrange};
        cursor: not-allowed;
        font-weight: bold;
        opacity: 0.48;
        outline: none !important;

        ${!disabled &&
        css`
          ${Mixin.clickable};
          opacity: 1;
          cursor: pointer;
        `}
      `}
      id={id}
      onClick={disabled ? undefined : onClick}
      style={{
        maxWidth: "512px",
      }}
    >
      <div className="text-center">{children}</div>
    </button>
  </div>
);
