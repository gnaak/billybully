/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import useStore from "@/store";

interface SituationProps {
  close: () => void;
  turn: number;
}

const Situation = ({ close, turn }: SituationProps) => {
  const { situationCard, setSituationCardId } = useStore();
  const situationStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid #f8c56a 1px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `;

  const coloredArea = css`
    width: 30%;
    height: 70%;
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

  const coloredArea2 = css`
    width: 85%;
    height: 75%;
    background-color: #f8c56a;
    border: dashed #fcb207 10px;
    box-shadow: 2px 3px #d66e00;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const situatonDeatil = css`
    display: flex;
    flex-direction: column;
    height: 85%;
    width: 100%;
    align-items: center;
    gap: 20px 0px;
  `;

  const situatonName = css`
    height: 20%;
    width: 80%;
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const situationExplanation = css`
    width: 90%;
    color: white;
    font-weight: bold;
    font-size: 1.2vw;
    display: flex;
    align-items: center;
  `;

  const exitButton = css`
    position: absolute;
    top: 3%;
    left: 93%;
    cursor: pointer;
  `;

  return (
    <>
      {situationCard?.situations && turn ? (
        <>
          <div
            css={situationStyle}
            onClick={() => {
              close();
              setSituationCardId(situationCard.situations[turn].id);
            }}
          >
            <div css={coloredArea}>
              <div css={coloredArea2}>
                <img
                  src={exit}
                  alt="종료하기"
                  css={exitButton}
                  onClick={() => {
                    close();
                    setSituationCardId(situationCard.situations[turn].id);
                  }}
                />

                <div css={situatonDeatil}>
                  <div css={situatonName}>
                    {situationCard.situations[turn].name}
                  </div>
                  <div></div>
                  <div></div>
                  <div css={situationExplanation}>
                    {situationCard.situations[turn].story}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Situation;
