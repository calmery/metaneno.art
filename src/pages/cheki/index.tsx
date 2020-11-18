import { styled } from "linaria/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiTrimPreview } from "~/containers/Cheki/ChekiTrimPreview";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { SplashScreen } from "~/containers/Cheki/SplashScreen";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const { shootingCondition } = useSelector(selectors.cheki);

  const handleOnLoadImage = useCallback((url: string) => {
    dispatch(actions.addImage({ url }));
    dispatch(
      actions.changeShootingCondition({ shootingCondition: "trimming" })
    );
  }, []);

  const handleOnClickShootButton = useCallback(
    () =>
      dispatch(
        actions.changeShootingCondition({ shootingCondition: "complate" })
      ),
    []
  );

  const handleOnClickShootAgainButton = useCallback(
    () =>
      dispatch(
        actions.changeShootingCondition({ shootingCondition: "trimming" })
      ),
    []
  );

  return (
    <>
      <ChekiApp>
        <Container>
          <ChekiHeader />
          {shootingCondition === "in-preparation" && (
            <ChekiInputImage onLoad={handleOnLoadImage} />
          )}
          {shootingCondition === "trimming" && (
            <>
              <ChekiTrim />
              <ChekiColumn margin>
                <ChekiShootButton onClick={handleOnClickShootButton} />
              </ChekiColumn>
            </>
          )}
          {shootingCondition === "complate" && (
            <>
              <ChekiTrimPreview />
              <ChekiColumn margin>
                <ChekiSubButton onClick={handleOnClickShootAgainButton}>
                  もう一度撮影する
                </ChekiSubButton>
              </ChekiColumn>
            </>
          )}
          <ChekiNavigation active="camera" />
        </Container>
      </ChekiApp>

      <SplashScreen />
    </>
  );
};

export default Cheki;
