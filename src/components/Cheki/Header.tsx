import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { ChekiModal, ChekiModalText, ChekiModalTitle } from "./Modal";
import { ChekiPopup } from "./Popup";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 24px;
  padding: ${Spacing.l}px;
  padding-bottom: ${Spacing.m}px;

  img {
    ${Mixin.clickable};

    cursor: pointer;
    height: 24px;

    &:last-child {
      margin-left: auto;
    }
  }
`;

export const ChekiHeader: React.FC = () => {
  const { push } = useRouter();
  const [information, setInformation] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

  const handleOnClickBackToTop = useCallback(() => push("/"), []);
  const handleOnClickClosePopup = useCallback(() => setBackToTop(false), []);
  const handleOnClickInformation = useCallback(
    () => setInformation(!information),
    [information]
  );
  const handleOnClickOpenPopup = useCallback(() => setBackToTop(true), []);

  return (
    <>
      <Container>
        <img
          alt="閉じる"
          height="24px"
          onClick={handleOnClickOpenPopup}
          src="/cheki/close.svg"
          width="24px"
        />
        <img
          alt="インフォメーション"
          height="24px"
          onClick={handleOnClickInformation}
          src={
            information
              ? "/cheki/information.selected.svg"
              : "/cheki/information.svg"
          }
          width="24px"
        />
      </Container>

      <ChekiModal
        visible={information}
        onClickCloseButton={() => {
          setInformation(false);
        }}
      >
        <ChekiModalTitle>利用規約</ChekiModalTitle>
        <ChekiModalText>
          利用規約は
          <a href="/cheki/terms-of-service">こちら</a>
          をご確認ください。
        </ChekiModalText>
        <ChekiModalTitle>お問い合わせ</ChekiModalTitle>
        <ChekiModalText>
          ご感想や不具合の報告は
          <a
            href="https://forms.gle/3snQ5xwAJJn86Mv69"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google フォーム
          </a>
          までお願いします。
        </ChekiModalText>
      </ChekiModal>

      {backToTop && (
        <ChekiPopup
          onCancel={handleOnClickClosePopup}
          onEnter={handleOnClickBackToTop}
          enterText="戻る"
        >
          めたねのあーとのトップページに戻りますか？
          <br />
          編集中の内容は全て失われます！
        </ChekiPopup>
      )}
    </>
  );
};
