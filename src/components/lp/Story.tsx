import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Badge from "./Badge";
import CreatorComment from "./CreatorComment";
import MainContentLink from "./MainContentLink";
import StoryTitle from "./Title/StoryTitle";
import creatorList from "./creatorList";
import { useIntersectionObserver } from "./hooks";
import { colors, media } from "./variables";

export default function Story() {
  const [descriptionRef, isDescriptionIntersected] = useIntersectionObserver<
    HTMLDivElement
  >({});
  const [subTitleRef, isSubTitleIntersected] = useIntersectionObserver<
    HTMLImageElement
  >({});

  return (
    <Wrapper>
      <Badge />
      <WaveWrapper>
        <Wave1 src="/lp/story/wave1.svg" />
        <Wave2 src="/lp/story/wave2.svg" />
      </WaveWrapper>
      <StoryTitle />
      <Description
        ref={descriptionRef}
        isIntersected={isDescriptionIntersected}
      >
        <span>深夜0時頃、主人公は誰かに呼ばれるように目が覚めて、</span>
        <br />
        <span>チケットを手にして部屋を歩きだします。</span>
        <br />
        <br />
        <span>その部屋はなぜだが奥に進むにつれて雰囲気が変わっていき、</span>
        <br />
        <span>最奥に2つの光る怪しげなクリームソーダを見つけます。</span>
        <br />
        <br />
        <span>既に自分が幻覚の中にいることに気付かぬまま、</span>
        <br />
        <span>
          キラキラ光るクリームソーダをどちらか選択して飲んでしまいます。
        </span>
        <br />
        <br />
        <span>何だかシュワシュワキラキラぐにゃぐにゃしてきました！</span>
        <br />
        <span>なんて不思議な味！あれ、段々と目の前が…？</span>
        <br />
        <span>少女は何色のクリームソーダに飛び込むのでしょうか…</span>
      </Description>
      <div>
        <SubTitle
          src="/lp/sub-title/comment.svg"
          ref={subTitleRef}
          isIntersected={isSubTitleIntersected}
        />
        <CommentWrapper>
          {creatorList.map(({ name, iconUrl, comment }) => (
            <CreatorComment
              key={iconUrl}
              iconUrl={iconUrl}
              name={name}
              comment={comment}
            />
          ))}
        </CommentWrapper>
      </div>
      <MainContentLink />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 52px;
  justify-items: center;
  padding-top: 140px;
  background-color: ${colors.yume};
  z-index: 1;

  ${media.smallDown} {
    grid-gap: 30px;
    padding-top: 180px;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 36px;
    background: url(/lp/decoration/wave-yume.png) center / auto 100% repeat-x;
    transform: translateY(-100%);

    ${media.smallDown} {
      height: 24px;
    }
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
    transform: translateY(100%) rotate(0.5turn);
  }
`;

const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1420px;
  height: 100%;
  pointer-events: none;
  transform: translateX(-50%);

  ${media.smallDown} {
    display: none;
  }
`;

const Wave1 = styled.img`
  position: absolute;
  top: 231px;
  left: 0;
  width: 242px;
`;

const Wave2 = styled.img`
  position: absolute;
  top: 260px;
  right: 0;
  width: 222px;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Description = styled.div<{ isIntersected: boolean }>`
  font-size: 30px;
  line-height: 80px;
  color: #fff;
  opacity: 0;

  ${media.mediumUp} {
    text-align: center;
    margin-bottom: 60px;
  }

  ${media.smallDown} {
    font-size: 20px;
    line-height: 58px;
    padding: 0 24px;
  }

  span {
    ${media.mediumUp} {
      padding: 8px 16px;
      background: linear-gradient(to right, #2babca 0% 50%, transparent 50%)
        left / 200% 100% no-repeat;
    }
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const SubTitle = styled.img<{ isIntersected: boolean }>`
  display: block;
  height: 58px;
  margin: 0 auto 52px;
  opacity: 0;

  ${media.smallDown} {
    height: 40px;
    margin: 0 auto 42px;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const CommentWrapper = styled.div`
  display: grid;
  grid-gap: 52px;

  ${media.smallDown} {
    grid-gap: 42px;
    padding: 0 24px;
  }
`;
