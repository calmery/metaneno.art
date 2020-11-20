import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasContainer } from "~/containers/Cheki/CanvasContainer";
import { ChekiCanvasSave } from "~/containers/Cheki/CanvasSave";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { selectors, useSelector } from "~/domains";
import { Spacing } from "~/styles/spacing";
import { getShareUrlById, upload } from "~/utils/cheki";

const ChekiSaveAndShare: NextPage = () => {
  const { layout } = useSelector(selectors.cheki);
  const { displayable } = layout;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    if (!shareId) {
      return;
    }

    window.location.href = getShareUrlById(shareId);
  }, [shareId]);

  // Events

  const handleOnClickShareButton = useCallback(async () => {
    if (!previewUrl) {
      return;
    }

    if (!shareId) {
      setShareId(await upload(previewUrl));
    }
  }, [previewUrl, shareId]);

  const handleOnCreatePreviewUrl = useCallback(setPreviewUrl, []);

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCanvasContainer>
          <ChekiCanvas>
            <ChekiCanvasSave onCreatePreviewUrl={handleOnCreatePreviewUrl} />
          </ChekiCanvas>
          <div
            className="absolute"
            css={css`
              height: ${displayable.height}px;
              width: ${displayable.width}px;
            `}
          >
            {previewUrl && (
              <img
                css={css`
                  height: 100%;
                  width: 100%;
                  object-fit: contain;
                `}
                src={previewUrl}
              />
            )}
          </div>
        </ChekiCanvasContainer>
        <ChekiColumn margin>
          <ChekiNote>
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を付けてシェアしよう
          </ChekiNote>
          <ChekiButton
            disabled={!previewUrl}
            onClick={handleOnClickShareButton}
          >
            <img
              alt="Twitter"
              css={css`
                height: 14px;
                margin-right: ${Spacing.xs}px;
              `}
              src="/cheki/twitter.svg"
            />
            Twitter にシェアする
          </ChekiButton>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default ChekiSaveAndShare;