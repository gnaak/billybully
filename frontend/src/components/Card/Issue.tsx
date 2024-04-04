/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useStore from "@/store";

interface AssetProps {
  close: () => void;
}

const Issue = ({ close }: AssetProps) => {
  const { issueData, setActionName, setCardId } = useStore();

  const situationStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const coloredArea = css`
    width: 50%;
    height: 60%;
    // background-color: #f8c56a;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 10px 10px black;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const modalTitle = css`
    display: flex;
    flex-direction: column;
    font-size: 2.5vw;
    font-weight: bold;
    gap: 20px;
    color: black;
    text-shadow: -0.5px -0.5px 0 white, 0.5px -0.5px 0 white,
      -0.5px 0.5px 0 white, 0.5px 0.5px 0 white; /* 텍스트 그림자 */
    margin: 2vw;
  `;

  const assetArea = css`
    width: 60%;
    height: 50%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 1vw;
  `;

  const assetColoredArea = css`
    width: 100%;
    height: 100%;
    background-color: #ffa5a5;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const assetKind = css`
    display: flex;
    width: 100%;
    height: 25%;
    font-size: 2vw;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #c58f8f;
    border-radius: 20px 20px 0 0; /* 상단 모서리만 둥글게 */
  `;

  const assetDetail = css`
    display: flex;
    width: 80%;
    height: 70%;
    margin: 3%;
    padding: 2%;
    background-color: #ffdfdc;
    box-shadow: 0 10px 20px #c58f8f;
    border-radius: 20px;
    font-size: 1vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const okBtn = css`
    width: 15%;
    height: 7%;
    background-color: white;
    border: solid #ffa5a5 2px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: #ffa5a5;
    font-weight: bold;
    font-size: 1.1vw;
    margin: 1vw;
    cursor: pointer;
  `;

  return (
    <>
      {issueData ? (
        <>
          <div
            css={situationStyle}
            onClick={() => {
              close();
              setActionName("ISSUE");
              setCardId(issueData.issueId);
            }}
          >
            <div css={coloredArea}>
              <div css={modalTitle}>ISSUE CARD</div>

              <div css={assetArea}>
                <div css={assetColoredArea}>
                  <div css={assetKind}>{issueData.name}</div>
                  <div css={assetDetail}>
                    <div>{issueData.description}</div>
                  </div>
                </div>
              </div>

              <div
                css={okBtn}
                onClick={() => {
                  close();
                  setActionName("ISSUE");
                  setCardId(issueData.issueId);
                }}
              >
                확인
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Issue;
