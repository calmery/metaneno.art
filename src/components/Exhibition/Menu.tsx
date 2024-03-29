import { css } from "@emotion/react";
import { Howler } from "howler";
import React, { useCallback, useEffect, useState } from "react";
import { Multiplay } from "./Menu/Multiplay";
import { OkusuriLand } from "./Menu/OkusuriLand";
import { Settings } from "./Menu/Settings";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { GraphicsQuality } from "~/types/exhibition";
import { useOkusuriLand } from "~/utils/okusuri.land";

const menuGroup = css`
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;
  user-select: none;
  z-index: 10;
`;

const menu = css`
  ${Mixin.animation};

  background: ${Colors.blackTransparent};
  border-radius: 2px;
  margin-left: ${Spacing.s}px;
  opacity: 0.48;
  padding: ${Spacing.xs}px ${Spacing.s}px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    opacity: 1;
  }

  img {
    ${Mixin.clickable};

    margin-left: ${Spacing.s}px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

// Main

const loadSettings = ():
  | Partial<{
      audioVolume: number;
      graphicsQuality: string;
      muted: boolean;
    }>
  | undefined => {
  const string = localStorage.getItem("exhibition-settings");

  if (!string) {
    return;
  }

  try {
    const json = JSON.parse(string);
    return json;
  } catch (_) {
    return;
  }
};

const saveSettings = (
  value: Partial<{
    audioVolume: number;
    graphicsQuality: string;
    muted: boolean;
  }>
) => {
  const json = loadSettings() || {};

  localStorage.setItem(
    "exhibition-settings",
    JSON.stringify({
      ...json,
      ...value,
    })
  );
};

export const ExhibitionMenu: React.FC<{
  mode: "2d" | "3d";
  multiplay: ReturnType<typeof useMultiplay>;
  okusuriLand: ReturnType<typeof useOkusuriLand>;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
}> = ({ mode, multiplay, okusuriLand, onChangeGraphicsQuality }) => {
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [currentGraphicsQuality, setCurrentGraphicsQuality] = useState<
    "high" | "low" | "middle"
  >("high");
  const [muted, setMuted] = useState(false);
  const [isOpenMultiplay, setIsOpenMultiplay] = useState(false);
  const [isOpenOkusuriLand, setIsOpenOkusuriLand] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // Events

  const handleChangeAudioVolume = useCallback((audioVolume: number) => {
    Howler.volume(audioVolume);
    saveSettings({ audioVolume });
    setCurrentAudioVolume(audioVolume);
  }, []);

  const handleChangeGraphicsQuality = useCallback(
    (graphicsQuality: "high" | "low" | "middle") => {
      onChangeGraphicsQuality(graphicsQuality);
      saveSettings({ graphicsQuality });
      setCurrentGraphicsQuality(graphicsQuality);
    },
    [onChangeGraphicsQuality]
  );

  const handleClickMuteAudioToggle = useCallback(() => {
    Howler.volume(muted ? currentAudioVolume : 0);
    saveSettings({ muted: !muted });
    setMuted(!muted);
  }, [currentAudioVolume, muted]);

  const handleCloseMultiplay = useCallback(() => setIsOpenMultiplay(false), []);

  const handleCloseOkusuriLand = useCallback(
    () => setIsOpenOkusuriLand(false),
    []
  );

  const handleCloseSettings = useCallback(() => setIsOpenSettings(false), []);

  const handleClickOpenMultiplay = useCallback(
    () => setIsOpenMultiplay(true),
    []
  );

  const handleClickOpenOkusuriLand = useCallback(
    () => setIsOpenOkusuriLand(true),
    []
  );

  const handleClickOpenSettings = useCallback(
    () => setIsOpenSettings(true),
    []
  );

  // Side Effects

  useEffect(() => {
    const settings = loadSettings();

    if (!settings) {
      return;
    }

    const { audioVolume, graphicsQuality, muted } = settings;

    if (audioVolume && !isNaN(audioVolume)) {
      Howler.volume(audioVolume);
      setCurrentAudioVolume(audioVolume);
    }

    if (
      graphicsQuality &&
      (graphicsQuality === "high" ||
        graphicsQuality === "low" ||
        graphicsQuality === "middle")
    ) {
      onChangeGraphicsQuality(graphicsQuality);
      setCurrentGraphicsQuality(graphicsQuality);
    }

    if (muted) {
      Howler.volume(0);
      setMuted(!!muted);
    }
  }, []);

  // Render

  return (
    <>
      <div
        className="fixed flex"
        css={css`
          ${menuGroup};
          ${isOpenOkusuriLand || isOpenSettings ? fadeOut : fadeIn}
        `}
      >
        {mode === "3d" && (
          <div css={menu}>
            <img
              alt="マルチプレイ"
              onClick={handleClickOpenMultiplay}
              src={`/exhibition/multiplay-${
                multiplay.players ? "on" : "off"
              }.svg`}
            />
          </div>
        )}
        <div css={menu}>
          <img
            alt="おくすりランド"
            onClick={handleClickOpenOkusuriLand}
            src="/exhibition/book.svg"
          />
        </div>
        <div css={menu}>
          <img
            alt="音量"
            onClick={handleClickMuteAudioToggle}
            src={`/exhibition/audio-${muted ? "off" : "on"}.svg`}
          />
        </div>
        <div css={menu}>
          <img
            alt="設定"
            onClick={handleClickOpenSettings}
            src="/exhibition/settings.svg"
          />
        </div>
      </div>
      {isOpenMultiplay && (
        <Multiplay {...multiplay} onClose={handleCloseMultiplay} />
      )}
      {isOpenOkusuriLand && (
        <OkusuriLand {...okusuriLand} onClose={handleCloseOkusuriLand} />
      )}
      {isOpenSettings && (
        <Settings
          currentAudioVolume={currentAudioVolume}
          currentGraphicsQuality={currentGraphicsQuality}
          muted={muted}
          onChangeAudioVolume={handleChangeAudioVolume}
          onChangeGraphicsQuality={handleChangeGraphicsQuality}
          onClickMuteToggle={handleClickMuteAudioToggle}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
