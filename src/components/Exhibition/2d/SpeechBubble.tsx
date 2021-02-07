import React, { useCallback, useEffect, useState } from "react";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
} from "~/constants/exhibition";
import { ChekiScenario } from "~/domains/cheki/models";
import { Colors } from "~/styles/colors";

const SPEECH_BUBBLE_FONT_SIZE = 10;
const SPEECH_BUBBLE_LINE_SPACE = 2;
const SPEECH_BUBBLE_MARGIN = 8;
const SPEECH_BUBBLE_HEIGHT =
  SPEECH_BUBBLE_FONT_SIZE * 2 +
  SPEECH_BUBBLE_MARGIN * 2 +
  SPEECH_BUBBLE_LINE_SPACE;
const SPEECH_BUBBLE_WIDTH =
  EXHIBITION_2D_CANVAS_WIDTH - SPEECH_BUBBLE_MARGIN * 2;
const SPEECH_BUBBLE_CHERRY_HEIGHT = 10;
const SPEECH_BUBBLE_CHERRY_WIDTH = 10;
const SPEECH_BUBBLE_CHERRY_X =
  EXHIBITION_2D_CANVAS_WIDTH -
  SPEECH_BUBBLE_MARGIN * 2 -
  SPEECH_BUBBLE_CHERRY_WIDTH -
  SPEECH_BUBBLE_MARGIN;
const SPEECH_BUBBLE_CHERRY_Y =
  SPEECH_BUBBLE_HEIGHT - SPEECH_BUBBLE_FONT_SIZE - SPEECH_BUBBLE_MARGIN;
const SPEECH_BUBBLE_MAXIMUM_CHARACTERS_PER_LINE = 35;

// Components

const Text: React.FC<{ line: number }> = ({ children, line }) => (
  <text
    dominantBaseline="hanging"
    fill={Colors.white}
    fontFamily="PixelMplus"
    fontSize={SPEECH_BUBBLE_FONT_SIZE}
    x={SPEECH_BUBBLE_MARGIN}
    y={
      SPEECH_BUBBLE_MARGIN +
      (SPEECH_BUBBLE_FONT_SIZE + SPEECH_BUBBLE_LINE_SPACE) * (line - 1)
    }
  >
    {children}
  </text>
);

export const Exhibition2dSpeechBubble: React.FC<{
  scenarios: ChekiScenario[];
  onComplete: () => void;
}> = ({ scenarios, onComplete }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [characterTimer, setCharacterTimer] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const scenario = scenarios[scenarioIndex]!;

  useEffect(() => {
    if (characterCount >= scenario.message.length) {
      return;
    }

    setCharacterTimer(
      window.setTimeout(() => {
        setCharacterCount(characterCount + 1);
      }, 80)
    );
  }, [characterCount, scenario]);

  // Events

  const handleOnClickSpeechBubble = useCallback(() => {
    if (characterCount >= scenario.message.length) {
      const nextScenarioIndex = scenarioIndex + 1;

      if (!scenarios[nextScenarioIndex]) {
        onComplete();
      } else {
        setScenarioIndex(nextScenarioIndex);
        setCharacterCount(0);
      }

      return;
    }

    if (characterTimer) {
      clearTimeout(characterTimer);
    }

    setCharacterCount(scenario.message.length);
  }, [
    scenarioIndex,
    characterCount,
    scenarios.length,
    scenario.message,
    characterTimer,
  ]);

  // Render

  return (
    <svg
      height={EXHIBITION_2D_CANVAS_HEIGHT}
      onClick={handleOnClickSpeechBubble}
      width={EXHIBITION_2D_CANVAS_WIDTH}
      x="0"
      xmlns="http://www.w3.org/2000/svg"
      y="0"
    >
      <rect fillOpacity="0" height="100%" width="100%" />
      <g transform="translate(8, 254)" className="cursor-pointer select-none">
        <rect height={SPEECH_BUBBLE_HEIGHT} width={SPEECH_BUBBLE_WIDTH} />
        <rect
          fill="red"
          height={SPEECH_BUBBLE_CHERRY_HEIGHT}
          width={SPEECH_BUBBLE_CHERRY_WIDTH}
          x={SPEECH_BUBBLE_CHERRY_X}
          y={SPEECH_BUBBLE_CHERRY_Y}
        />
        <Text line={1}>
          {scenario.message.slice(
            0,
            characterCount <= SPEECH_BUBBLE_MAXIMUM_CHARACTERS_PER_LINE
              ? characterCount
              : SPEECH_BUBBLE_MAXIMUM_CHARACTERS_PER_LINE
          )}
        </Text>
        <Text line={2}>
          {scenario.message.slice(
            SPEECH_BUBBLE_MAXIMUM_CHARACTERS_PER_LINE,
            characterCount
          )}
        </Text>
      </g>
    </svg>
  );
};
