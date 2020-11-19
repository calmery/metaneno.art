import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { ChekiApp } from "../../components/Cheki/App";
import { ChekiLogo } from "~/components/Cheki/Logo";
import { SPLASH_SCREEN_DURATION } from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Animation = styled.div`
  ${Mixin.animation};
`;

const Comment = styled.div`
  bottom: ${Spacing.l}px;
  color: ${Colors.black};

  img {
    display: inline-block;
    vertical-align: middle;
  }
`;

const Image = styled.img`
  height: 196px;
  width: 196px;
`;

export const SplashScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { ready } = useSelector(selectors.cheki);

  const [fire, setFire] = useState(false);

  // Side Effects

  useEffect(() => {
    setTimeout(() => {
      setFire(true);
    }, SPLASH_SCREEN_DURATION);
  }, []);

  useEffect(() => {
    if (fire) {
      setTimeout(() => {
        dispatch(actions.ready());
      }, Mixin.ANIMATION_DURATION.milliseconds);
    }
  }, [fire]);

  // Render

  if (ready) {
    return null;
  }

  return (
    <Animation css={fire ? fadeOut : undefined}>
      <ChekiApp className="bottom-0 flex items-center justify-center left-0 right-0 top-0">
        <ChekiLogo size={196} />
        <Comment className="absolute font-bold" css={Typography.XS}>
          Made with <img src="/heart.svg" /> by めたねのおくすり
        </Comment>
      </ChekiApp>
    </Animation>
  );
};
