/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useStore from "@/store";

// import useModal from "@/hooks/useModal";
interface AssetProps {
  close: () => void;
}

const Asset = ({ close }: AssetProps) => {
  const { fintechData, setActionName, setCardId, totalAsset } = useStore();

  // const [isOpenSituation, openSituation, closeSituation] = useModal();
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
    flex-direction: column;
    justify-content: center; /* 세로 가운데 정렬 */
    align-items: center; /* 가로 가운데 정렬 */
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
    margin-bottom: 1.5vw;
  `;

  const description = css`
    display: flex;
    flex-direction: column;
    font-size: 1.1vw;
    gap: 20px;
    color: white;
    margin-bottom: 1vw;
  `;

  const assetsArea = css`
    display: flex;
    flex-direction: row;
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: space-between; /* 가로로 여러 개를 가운데 정렬 */
    align-content: center; /* 세로 가운데 정렬 */
    padding: 10px;
  `;

  const assetArea = css`
    width: 16vw;
    height: 23vw;
    background-color: white;
    border-radius: 20px;
    box-shadow: 3px 3px #363636;
    padding: 10px;
    margin: 10px;
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
    font-size: 1.2vw;
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
    }
  `;

  const numberStyle = css`
    font-size: 1.2vw;
    font-weight: bold;
  `;

  const okBtn = css`
    width: 13%;
    height: 6%;
    background-color: white;
    border: solid #fcb207 2px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: #f8c56a;
    font-weight: bold;
    font-size: 1.1vw;
    margin-top: 1.5vw;
    cursor: pointer;
  `;
  return (
    <>
      <div
        css={situationStyle}
      >
        <div css={coloredArea}>
          <div css={modalTitle}>FINTECH CARD</div>
          <div css={description}>
            원하는 재테크 카드를 선택하세요. 재테크를 하지 않으려면 확인 버튼을
            눌러 주세요.
          </div>
          {/*<img src={exit} alt="종료하기" css={exitButton} onClick={close}/>*/}
          <div css={assetsArea}>
            {fintechData && totalAsset ? (
              <>
                <div css={assetArea}>
                  {fintechData.cardList[0]?.type === "REAL_ESTATE" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>부동산</div>
                      <div css={assetName}>{fintechData.cardList[0].name}</div>
                      <div css={assetDetail}>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].sellPrice}
                        </div>
                        <div>월 수입</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset?.myProperty.cash >=
                            fintechData.cardList[0].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[0].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[0].type === "INVESTMENT" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>투자</div>
                      <div css={assetName}>{fintechData.cardList[0].name}</div>
                      <div css={assetDetail}>
                        <div>투자금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].sellPrice}
                        </div>
                        <div>배당금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[0].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[0].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[0].type === "FOUNDATION" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>창업</div>
                      <div css={assetName}>{fintechData.cardList[0].name}</div>
                      <div css={assetDetail}>
                        <div>창업 비용</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].buyPrice}
                        </div>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[0].sellPrice}
                        </div>
                        <div>월 수입</div>
                        <div>{fintechData.cardList[0].income}</div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[0].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[0].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : null}
                </div>
                <div css={assetArea}>
                  {fintechData.cardList[1].type === "REAL_ESTATE" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>부동산</div>
                      <div css={assetName}>{fintechData.cardList[1].name}</div>
                      <div css={assetDetail}>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].sellPrice}
                        </div>
                        <div>월 수입</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[1].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[1].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[1].type === "INVESTMENT" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>투자</div>
                      <div css={assetName}>{fintechData.cardList[1].name}</div>
                      <div css={assetDetail}>
                        <div>투자금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].buyPrice}
                        </div>
                        <div>배당금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[1].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[1].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[1].type === "FOUNDATION" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>창업</div>
                      <div css={assetName}>{fintechData.cardList[1].name}</div>
                      <div css={assetDetail}>
                        <div>창업 비용</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].buyPrice}
                        </div>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].sellPrice}
                        </div>
                        <div>월 수입</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[1].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[1].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[1].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : null}
                </div>
                <div css={assetArea}>
                  {fintechData.cardList[2].type === "REAL_ESTATE" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>부동산</div>
                      <div css={assetName}>{fintechData.cardList[2].name}</div>
                      <div css={assetDetail}>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].buyPrice}
                        </div>
                        <div>월 수입</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[2].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");

                            setCardId(fintechData.cardList[2].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[2].type === "INVESTMENT" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>투자</div>
                      <div css={assetName}>{fintechData.cardList[2].name}</div>
                      <div css={assetDetail}>
                        <div>투자금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].buyPrice}
                        </div>
                        <div>배당금</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[2].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[2].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : fintechData.cardList[2].type === "FOUNDATION" ? (
                    <div css={assetColoredArea}>
                      <div css={assetKind}>창업</div>
                      <div css={assetName}>{fintechData.cardList[2].name}</div>
                      <div css={assetDetail}>
                        <div>창업 비용</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].buyPrice}
                        </div>
                        <div>매매가</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].sellPrice}
                        </div>
                        <div>월 수입</div>
                        <div css={numberStyle}>
                          {fintechData.cardList[2].income}
                        </div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          if (
                            totalAsset.myProperty.cash >=
                            fintechData.cardList[2].buyPrice!
                          ) {
                            close();
                            setActionName("FINTECH");
                            setCardId(fintechData.cardList[2].fintechId);
                          } else {
                            alert("자산이 부족합니다");
                            setActionName("FINTECH");
                            setCardId(0);
                          }
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
          <div
            css={okBtn}
            onClick={() => {
              close();
              setActionName("FINTECH");
              setCardId(0);
            }}
          >
            확인
          </div>
        </div>
      </div>
    </>
  );
};

export default Asset;
