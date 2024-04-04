/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useStore from "@/store";
interface AssetProps {
  close: () => void;
}

const Multi = ({ close }: AssetProps) => {
  const { privateAsset, setActionName, setCardId } = useStore();

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
    width: 55%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border: solid 2px black;
    box-shadow: 10px 10px black;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
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
    align-content: center;
    align-items: center;
    font-size: 1.1vw;
    gap: 10px;
    color: white;
    margin-bottom: 1vw;
  `;

  const coloredArea3 = css`
    width: 55%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0.5);
    border: solid 2px black;
    box-shadow: 10px 10px black;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const coloredArea2 = css`
    width: 55%;
    height: 30%;
    background-color: #f8c56a;
    border: dashed #fcb207 10px;
    box-shadow: 2px 3px #d66e00;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  `;

  const okBtn = css`
    width: 15%;
    height: 8%;
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
    margin-top: 1vw;
    cursor: pointer;
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
    font-size: 1.7rem;
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
    font-size: 1.5rem;
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
    font-size: 1.1rem;
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
  return (
    <div
      css={situationStyle}
      onClick={() => {
        setCardId(0);
        setActionName("DOUBLE");
        close();
      }}
    >
      {privateAsset ? (
        <>
          {privateAsset.fintechList.length ? (
            <>
              <div css={coloredArea}>
                <div css={modalTitle}>두배 아줌마</div>
                <div css={description}>
                  <div>두배 아줌마를 만났습니다!</div>
                  <div>가지고 있는 재테크 중 하나를 2배에 팔 수 있습니다.</div>
                </div>
                {privateAsset.fintechList.map((fintech, index) => (
                  <div key={index} css={assetArea}>
                    <div css={assetColoredArea}>
                      <div css={assetKind}>{fintech.type}</div>
                      <div css={assetName}> {fintech.name}</div>
                      <div css={assetDetail}>
                        매매가 : {fintech.sellPrice}
                        <div>월 수입 : {fintech.income}</div>
                      </div>
                      <div
                        css={selectBtn}
                        onClick={() => {
                          setCardId(fintech.fintechId);
                          setActionName("DOUBLE");
                          close();
                        }}
                      >
                        선택하기
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div css={coloredArea3}>
                <div css={modalTitle}>두배 아줌마</div>
                <div css={description}>
                  <div>두배 아줌마를 만났습니다!</div>
                  <div>가지고 있는 재테크 중 하나를 2배에 팔 수 있습니다.</div>
                </div>
                <div css={coloredArea2}>팔 수 있는 자산이 없습니다!</div>
                <div
                  css={okBtn}
                  onClick={() => {
                    close();
                    setActionName("HALF");
                    setCardId(0);
                  }}
                >
                  확인
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div css={coloredArea3}>
          <div css={modalTitle}>두배 아줌마</div>
          <div css={description}>
            <div>두배 아줌마를 만났습니다!</div>
            <div>가지고 있는 재테크 중 하나를 2배에 팔 수 있습니다.</div>
          </div>
          <div css={coloredArea2}>팔 수 있는 자산이 없습니다!</div>
          <div
            css={okBtn}
            onClick={() => {
              close();
              setActionName("HALF");
              setCardId(0);
            }}
          >
            확인
          </div>
        </div>
      )}
    </div>
  );
};

export default Multi;
