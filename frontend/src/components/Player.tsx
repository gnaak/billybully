/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import profile1 from "../assets/profile.jpg";
import useStore from "../store/index";

const Player = () => {
  const {
    playerName,
    playerCash,
    playerLoan,
    playerRealEstate,
    // playerInvestment,
    // playerFoundation,
    player2Name,
    player2Cash,
    player2Loan,
    player3Name,
    player3Cash,
    player3Loan,
    player4Name,
    player4Cash,
    player4Loan,
  } = useStore();
  const player1Outline = css`
    position: absolute;
    top: 80%;
    left: 55%;
    height: 15vh;
    width: 40vh;
    border: solid #f9d188 1px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 5px;
  `;

  const player2Outline = css`
    position: absolute;
    top: 80%;
    left: 5%;
    height: 15vh;
    width: 40vh;
    border: solid #f9d188 1px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 5px;
  `;

  const player3Outline = css`
    position: absolute;
    top: 5%;
    left: 5%;
    height: 15vh;
    width: 40vh;
    border: solid #f9d188 1px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 5px;
  `;
  const player4Outline = css`
    position: absolute;
    top: 5%;
    left: 55%;
    height: 15vh;
    width: 40vh;
    border: solid #f9d188 1px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 5px;
  `;
  const playerStyle = css`
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background-color: #f9d188;
    display: flex;
    align-items: center;
  `;
  const player1Profile = css`
    margin: 20px;
    width: auto;
    height: 80%;
    border-radius: 50%;
    object-fit: cover;
    border: white solid 1px;
  `;
  const player1Info = css`
    width: 60%;
    height: 80%;
    color: white;
    font-weight: bold;
  `;
  const playerNameStyle = css`
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: start;
  `;
  const playerAsset = css`
    font-size: 1rem;
    text-align: start;
  `;
  const playerInfo = css`
    position: absolute;
    top: 5%;
    left: 80%;
    height: 50vh;
    width: 30vh;
    border: solid #f9d188 5px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const playerSituInfo = css`
    display: flex;
    margin: 5px;
    height: 20%;
    width: 95%;
    border-radius: 10px;
    background-color: #f9d188;
    display: flex;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  `;
  const playerAssetInfo = css`
    margin: 5px;
    height: 72%;
    width: 95%;
    border-radius: 10px;
    background-color: #f9d188;
    display: flex;
    color: white;
    flex-direction: column;
  `;
  const chat = css`
    position: absolute;
    top: 57%;
    left: 80%;
    height: 25vh;
    width: 30vh;
    border: solid #f9d188 5px;
    border-radius: 20px;
    background-color: white;
    display: flex;
  `;
  const exitStyle = css`
    position: absolute;
    top: 84%;
    left: 80%;
    height: 10vh;
    width: 30vh;
    border: solid 5px white;
    background-color: rgba(248, 197, 106);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration-line: none;
    cursor: pointer;
  `;
  return (
    <>
      <div css={player1Outline}>
        <div css={playerStyle}>
          <img src={profile1} alt="player1proifle" css={player1Profile} />

          <div css={player1Info}>
            <div css={playerNameStyle}>{playerName}</div>
            <div css={playerAsset}>
              <div>현재 자산 : {playerCash}</div>
              <div>부채 : {playerLoan}</div>
              <div>총 자산 : {playerCash - playerLoan}</div>
            </div>
          </div>
        </div>
      </div>
      <div css={player2Outline}>
        <div css={playerStyle}>
          <img src={profile1} alt="player1proifle" css={player1Profile} />
          <div css={player1Info}>
            <div css={playerNameStyle}>{player2Name}</div>
            <div css={playerAsset}>
              <div>현재 자산 : {player2Cash}</div>
              <div>부채 : {player2Loan}</div>
              <div>총 자산 : {player2Cash - player2Loan}</div>
            </div>
          </div>
        </div>
      </div>
      <div css={player3Outline}>
        <div css={playerStyle}>
          <img src={profile1} alt="player1proifle" css={player1Profile} />
          <div css={player1Info}>
            <div css={playerNameStyle}>{player3Name}</div>
            <div css={playerAsset}>
              <div>현재 자산 : {player3Cash}</div>
              <div>부채 : {player3Loan}</div>
              <div>총 자산 : {player3Cash - player3Loan}</div>
            </div>
          </div>
        </div>
      </div>
      <div css={player4Outline}>
        <div css={playerStyle}>
          <img src={profile1} alt="player1proifle" css={player1Profile} />
          <div css={player1Info}>
            <div css={playerNameStyle}>{player4Name}</div>
            <div css={playerAsset}>
              <div>현재 자산 : {player4Cash}</div>
              <div>부채 : {player4Loan}</div>
              <div>총 자산 : {player4Cash - player4Loan}</div>
            </div>
          </div>
        </div>
      </div>
      <div css={playerInfo}>
        <div css={playerSituInfo}>코로나 : -10%</div>
        <div css={playerAssetInfo}>
          {playerRealEstate.map((realEstate, index) => (
            <div key={index}>
              <div>부동산 : {realEstate.name}</div>
              <div>매매가 : {realEstate.salePrice}</div>
              <div>월 수익 : {realEstate.income}</div>
              <br />
            </div>
          ))}
        </div>
      </div>
      <div css={chat}></div>
      <Link to="/" css={exitStyle}>
        방 나가기
      </Link>
    </>
  );
};

export default Player;
