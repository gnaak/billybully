/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "../assets/exit.png";
import { MouseEventHandler } from "react";
import profile1 from "../assets/profile.jpg";

interface EndGameProps {
  close: MouseEventHandler<HTMLDivElement>;
}

const EndGame = ({ close }: EndGameProps) => {
  const situationStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid #f8c56a 1px;
    border-radius: 20px;
    background-color: white;
    width: 60%;
    height: 70%;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding: 10px;
  `;

  const coloredArea = css`
    width: 100%;
    height: 100%;
    background-color: #f8c56a;
    border: solid #f8c56a 1px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    text-align: center;
    gap: 10px;
  `;

  const winStyle = css`
    display: flex;
    height: 20%;
    color: white;
    font-size: 7rem;
    align-items: center;
    width: 90%;
    text-align: center;
    justify-content: center;

  `;

  const winPlayer = css`
    height: 60%;
    width:70%;
    display: flex;
    flex-direction: column;
  `;
  const winPlayerInfo = css`
    height: 50%;
    width: 90%;
    display: flex;
    flex-direction: row;
  `;

  const exitButton = css`
    position: absolute;
    top: 3%;
    left: 93%;
    cursor: pointer;
  `;

  const player1Profile = css`
    margin: 10px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 20px;
    margin-right: 50px;
    border: solid;
    overflow: hidden;
  `;
  const player1Name = css`
    color: white;
    font-weight: bold;
    font-size: 3rem;
    text-align: center;
    align-self: center;
    justify-self: center;
  `;
  const player1Asset = css`
  margin: 30px;
  height: 60%;
    font-size: 1.5rem;
    text-align: start;
    justify-content: start;
  `;

  return (
    <div css={situationStyle}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        <div css={winStyle}> WIN </div>
        <div css={winPlayer}>
          <div css={winPlayerInfo}>
            <img src={profile1} alt="player1proifle" css={player1Profile} />
            <div css={player1Name}>그낙1</div>
          </div>
          <div css={player1Asset}>
            부동산 수익(률) : 100,000,000 (+250%) 
            <br />투자 수익률 
            <br />창업 수익률
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
