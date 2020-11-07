import React, { useCallback, useEffect, useState } from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  getImageSizeByDirection,
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

export const ChekiCanvasImageLayer: React.FC = () => {
  const dispatch = useDispatch();
  const { image } = useSelector(selectors.cheki);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { direction } = image;

  const handleOnStartDragging = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      dispatch(
        actions.startImageDragging({
          cursorPositions: convertEventToCursorPositions(event),
        })
      );
    },
    []
  );

  useEffect(() => {
    const { height, width } = getImageSizeByDirection(direction);
    setHeight(height);
    setWidth(width);
  }, [direction]);

  return (
    <svg
      height={height}
      onMouseDown={handleOnStartDragging}
      onTouchStart={handleOnStartDragging}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      x={CHEKI_FRAME_MARGIN_LEFT}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={CHEKI_FRAME_MARGIN_TOP}
    >
      <defs>
        <filter id="cheki-canvas-image-layer" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={[
              [0.8, 0, 0, 0, 0],
              [0, 0.8, 0, 0, 0],
              [0, 0, 0.8, 0, 0],
              [0, 0, 0, 1, 0],
            ].join(" ")}
          />
          <feComponentTransfer>
            <feFuncB type="linear" slope="1" intercept={0.2 * (13 / 255)} />
            <feFuncG type="linear" slope="1" intercept={0.2 * (70 / 255)} />
            <feFuncR type="linear" slope="1" intercept={0.2 * (120 / 255)} />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect fill="#fff" width="100%" height="100%" />
      <image
        {...image}
        filter="url(#cheki-canvas-image-layer)"
        xlinkHref={image.url}
      />
    </svg>
  );
};
