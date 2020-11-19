import React from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { selectors, useSelector } from "~/domains";

export const ChekiFilteredCanvas: React.FC = () => {
  const cheki = useSelector(selectors.cheki);

  const { image, layout } = cheki;
  const { displayable, trim } = layout;
  const { filter, height, width, url } = image;

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
    >
      <svg
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        x={image.x}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={image.y}
      >
        <ChekiFilterDefs />
        <ChekiFilterImage
          filter={filter}
          height={height}
          href={url}
          width={width}
        />
      </svg>
    </svg>
  );
};
