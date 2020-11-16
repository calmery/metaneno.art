import { css } from "linaria";
import React from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";

const container = css`
  background: ${GradientColors.pinkToOrange};
  border-radius: 4px;
  color: ${Colors.white};
  display: inline-block;
  font-weight: bold;
  margin: 0 ${Spacing.xs / 2}px;
  padding: ${Spacing.xs / 2}px ${Spacing.xs}px;
`;

export const HashTag: React.FC<{
  children: string;
}> = ({ children }) => <span className={container}>{children}</span>;
