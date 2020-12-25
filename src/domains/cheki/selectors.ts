import { State } from "../";

export const displayableHeight = ({ cheki }: State) =>
  cheki.layout.displayable.height;
export const displayableWidth = ({ cheki }: State) =>
  cheki.layout.displayable.width;
export const displayableX = ({ cheki }: State) => cheki.layout.displayable.x;
export const displayableY = ({ cheki }: State) => cheki.layout.displayable.y;

export const frameHeight = ({ cheki }: State) => cheki.layout.frame.height;
export const frameWidth = ({ cheki }: State) => cheki.layout.frame.width;
export const frameViewBoxHeight = ({ cheki }: State) =>
  cheki.layout.frame.viewBoxHeight;
export const frameViewBoxWidth = ({ cheki }: State) =>
  cheki.layout.frame.viewBoxWidth;
export const frameX = ({ cheki }: State) => cheki.layout.frame.x;
export const frameY = ({ cheki }: State) => cheki.layout.frame.y;

export const trimHeight = ({ cheki }: State) => cheki.layout.trim.height;
export const trimWidth = ({ cheki }: State) => cheki.layout.trim.width;
export const trimViewBoxHeight = ({ cheki }: State) =>
  cheki.layout.trim.viewBoxHeight;
export const trimViewBoxWidth = ({ cheki }: State) =>
  cheki.layout.trim.viewBoxWidth;
export const trimX = ({ cheki }: State) => cheki.layout.trim.x;
export const trimY = ({ cheki }: State) => cheki.layout.trim.y;