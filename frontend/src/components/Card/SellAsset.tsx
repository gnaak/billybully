/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import useStore from "@/store";

interface AssetProps {
  close: () => void;
}

const SellAsset = ({ close }: AssetProps) => {
  const { setFintectId, privateAsset, totalAsset } = useStore();
  console.log(privateAsset);
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
    width: 65%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border: solid 2px black;
    box-shadow: 10px 10px black;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const assetArea = css`
    width: 25%;
    height: 65%;
    background-color: white;
    border-radius: 20px;
    box-shadow: 3px 3px #363636;
    display: flex;
    flex-direction: row;
    padding: 10px;
  `;

  const assetColoredArea = css`
    width: 100%;
    height: 100%;
    background-color: #f8c56a;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;

  const assetKind = css`
    display: flex;
    width: 100%;
    height: 20%;
    font-size: 1.5vw;
    color: black;
    justify-content: center;
    align-items: center;
    background-color: #ff9632;
    border-radius: 20px 20px 0 0; /* 상단 모서리만 둥글게 */
  `;
  const assetName = css`
    width: 90%;
    height: 10%;
    margin-top: 5%;
    font-size: 1.2vw;
    text-align: center;
    color: black;
    border-bottom: 1px solid black; /* 밑줄 스타일 추가 */
    white-space: nowrap; /* 여기에 추가 */
    overflow: hidden; /* 텍스트가 넘칠 때 숨김 */
    text-overflow: ellipsis; /* 넘칠 때 말줄임표 사용 */
  `;

  const assetDetail = css`
    display: flex;
    width: 80%;
    height: 70%;
    margin-top: 5%;
    font-size: 1vw;
    color: black;
    background-color: #ffeca7;
    box-shadow: 0 1px 5px #60563b;
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 7px;
  `;

  const selectBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 15%;
    background-color: white;
    border-radius: 20px;
    color: #f8c56a;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s; /* 애니메이션을 위해 추가 */
    &:hover {
      background-color: #d7b069; /* 마우스 호버 시의 색깔 */
      color: white; /* 선택 사항: 글자 색상을 바꿀 수도 있습니다 */
  `;

  const numberStyle = css`
    font-size: 1.2vw;
    font-weight: bold;
  `;

  const exitButton = css`
    position: absolute;
    top: 3%;
    left: 93%;
    cursor: pointer;
  `;
  console.log(totalAsset);
  return (
    <div css={situationStyle}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        {privateAsset?.fintechList ? (
          <>
            {privateAsset.fintechList.map((fintech, index) => (
              <div key={index} css={assetArea}>
                <div css={assetColoredArea}>
                  <div css={assetKind}>{fintech.type}</div>
                  <div css={assetName}> {fintech.name}</div>
                  <div css={assetDetail}>
                    <div>매매가</div>
                    <div css={numberStyle}>{fintech.sellPrice}</div>
                    <div>월 수입</div>
                    <div css={numberStyle}>{fintech.income}</div>
                  </div>
                  <div
                    css={selectBtn}
                    onClick={() => {
                      console.log(fintech.fintechId);
                      console.log(fintech.type);
                      setFintectId(fintech.fintechId);
                      close();
                    }}
                  >
                    선택하기
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {totalAsset?.myProperty.fintechList ? (
              <>
                {totalAsset?.myProperty.fintechList.map((fintech, index) => (
                  <div key={index} css={assetArea}>
                    <div css={assetColoredArea}>
                      <div css={assetKind}>{fintech.type}</div>
                      <div css={assetName}> {fintech.name}</div>
                      <div css={assetDetail}>
                        <div>매매가</div>
                        <div css={numberStyle}>{fintech.sellPrice}</div>
                        <div>월 수입</div>
                        <div css={numberStyle}>{fintech.income}</div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          console.log(fintech.fintechId);
                          console.log(fintech.type);
                          setFintectId(fintech.fintechId);
                          close();
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default SellAsset;
