import React from "react";
import { ChekiCanvasImage } from "~/containers/Cheki/Refactor/CanvasImage";
import { selectors, useSelector } from "~/domains";

type ChekiTrimImageProps = {
  hidden?: boolean;
};

export const ChekiCanvasTrim: React.FC<ChekiTrimImageProps> = ({
  hidden = false,
}) => {
  const { image, layout } = useSelector(selectors.cheki);
  const { displayable, trim } = layout;

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
      overflow={hidden ? "hidden" : "visible"}
    >
      <ChekiCanvasImage filter={null} />
    </svg>
  );
};
