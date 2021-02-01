import {
  EXHIBITION_2D_DISTANCE_PER_STEP,
  EXHIBITION_2D_HEIGHT,
  EXHIBITION_2D_MINIMUM_STEP_TO_START_ANIMATION,
} from "~/constants/exhibition";

export const Exhibition2dObject: React.FC<{
  speed?: number;
  step: number;
  url: string;
  x?: number;
}> = ({ speed, step, url, x }) => (
  <image
    height={EXHIBITION_2D_HEIGHT}
    style={{
      imageRendering: "pixelated",
    }}
    transform={`translate(${
      (step < EXHIBITION_2D_MINIMUM_STEP_TO_START_ANIMATION
        ? 0
        : (step - EXHIBITION_2D_MINIMUM_STEP_TO_START_ANIMATION) *
          EXHIBITION_2D_DISTANCE_PER_STEP *
          (speed || 1) *
          -1) + (x || 0)
    } 0)`}
    xlinkHref={url}
  />
);
