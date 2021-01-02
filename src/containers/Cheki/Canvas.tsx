import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

// Styles

const canvas = css`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

// Components

export const ChekiCanvas: React.FC<
  React.SVGProps<SVGSVGElement> & { emotion?: Interpolation<Theme> }
> = (props) => {
  const { emotion } = props;
  const onTouchMove = (props.onTouchMove as unknown) as (
    event: TouchEvent
  ) => void;

  const dispatch = useDispatch();
  const { height, width } = useSelector(selectors.displayable);
  const frameReady = useSelector(selectors.frameReady);

  // Events

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  // Refs

  const canvasRef = useRef<SVGSVGElement>(null);
  const ref = useDisplayable<HTMLDivElement>(handleOnUpdateDisplayable);

  // Side Effects

  useEffect(() => {
    if (!frameReady) dispatch(actions.changeFrame({ index: 0 }));
  }, [frameReady]);

  // `onTouchMove` が渡されたときには `{ passive: false }` を追加する
  useEffect(() => {
    const e = canvasRef.current;

    if (!e || !onTouchMove) return;

    e.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      e.removeEventListener("touchmove", onTouchMove);
    };
  }, [canvasRef, onTouchMove]);

  // Render

  return (
    <Container css={emotion} ref={ref}>
      <svg
        {...props}
        css={canvas}
        height={height}
        onTouchMove={undefined}
        ref={canvasRef}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </Container>
  );
};
