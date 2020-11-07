import blueimpLoadImage from "blueimp-load-image";
import {
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_WIDTH,
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";

const isTouchRelatedEvent = (
  event: MouseRelatedEvent | TouchRelatedEvent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): event is TouchRelatedEvent => !!(event as any).touches;

export const convertFileToUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    blueimpLoadImage(
      file,
      async (canvas) => {
        if (canvas instanceof Event && canvas.type === "error") {
          return reject(canvas);
        }

        resolve((canvas as HTMLCanvasElement).toDataURL("image/png"));
      },
      { canvas: true, orientation: true }
    );
  });

export type CursorPosition = { x: number; y: number };
export type MouseRelatedEvent = MouseEvent | React.MouseEvent;
export type TouchRelatedEvent = React.TouchEvent | TouchEvent;

export const convertEventToCursorPositions = (
  event: MouseRelatedEvent | TouchRelatedEvent
): CursorPosition[] => {
  const positions = [];

  if (isTouchRelatedEvent(event)) {
    for (let i = 0; i < event.touches.length; i++) {
      positions.push({
        x: event.touches[i].clientX,
        y: event.touches[i].clientY,
      });
    }
  } else {
    positions.push({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return positions;
};

export const getFrameSizeByDirection = (direction: ChekiDirection) => ({
  height:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_FRAME_HEIGHT
      : CHEKI_VERTICAL_FRAME_HEIGHT,
  width:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_FRAME_WIDTH
      : CHEKI_VERTICAL_FRAME_WIDTH,
});

export const getImageSizeByDirection = (direction: ChekiDirection) => ({
  height:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_HEIGHT
      : CHEKI_VERTICAL_IMAGE_HEIGHT,
  width:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_WIDTH
      : CHEKI_VERTICAL_IMAGE_WIDTH,
});
