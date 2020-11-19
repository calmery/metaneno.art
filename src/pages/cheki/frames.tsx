import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiFrameList } from "~/containers/Cheki/FrameList";
import { ChekiFramedCanvas } from "~/containers/Cheki/FramedCanvas";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

export const ChekiFrames: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvas>
        <ChekiFramedCanvas />
      </ChekiCanvas>
      <ChekiColumn>
        <ChekiFrameList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFrames;
