/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Lock from "@/assets/lock.png";

interface RoomProps {
  roomId: number | null;
  roomName: string | null;
  numParticipants: number | null;
  hasPassword: number | null;
  masterNickname: string | null;
  masterName: string | null;

}
const Room = ({
  roomId,
  roomName,
  numParticipants,
  hasPassword,

  masterName,

}: RoomProps) => {
  const room = css`
    height: 80%;
    width: 100%;
    padding: 1%;
    @media (min-width: 768px) { /* 화면 너비가 768px 이상인 경우 */
      padding: 2%;
    }
  `;

  const roomMT = css`
    height: 35%;
    width: 45%;
    background-color: #f8c56a;
    border-radius: 5vw; /* vw 단위를 사용하여 반응형으로 설정 */
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    color: white;
    margin: 1%;
    @media (min-width: 768px) { /* 화면 너비가 768px 이상인 경우 */
      margin: 2%;
    }
  `;

  const roomFirstRow = css`
    height: 50%;
    width: 92%;
    margin: 1%;
    font-weight: bold;
    background-color: #84a7ad;
    border-radius: 0.7vw; /* vw 단위를 사용하여 반응형으로 설정 */
    border: solid black 1px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) { /* 화면 너비가 768px 이상인 경우 */
      margin: 2%;
    }
  `;
  const roomNumber = css`
    height: 75%;
    width: 25%;
    font-size: 1.3vw; /* 화면 비율에 따라 크기가 조절됩니다. */
    background-color: #a2ced6;
    border-radius: 0.7vw; /* 화면 비율에 따라 테두리 모서리가 조절됩니다. */
    border: solid 0.05vw black; /* 화면 비율에 따라 테두리 두께가 조절됩니다. */
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    margin-left: 0.5vw;
    text-shadow: 0.07vw 0.07vw black; /* 화면 비율에 따라 테두리 효과가 조절됩니다. */
  `;
  const roomTitleName = css`
    height:66%;
    width: 70%;
    font-size: 1.3vw;
    justify-content: end;
    margin-right: 1vw;
    align-content: center;
    display: flex;
    text-shadow: 0.07vw 0.07vw black;
  `;

  const roomSecondRow = css`
    display: flex;
    flex-direction: row;
    margin-top: 1vh; /* 화면 비율에 따라 여백이 조절됩니다. */
    height: 5vh; /* 화면 비율에 따라 높이가 조절됩니다. */
    font-size: 1vw;
    justify-content: center;
    align-items: center;
  `;

  const roomMaster = css`
    width: 40%;
    margin-left: -2vw; /* 화면 비율에 따라 여백이 조절됩니다. */
    justify-content: start;
    display: flex;
    font-size: 0.9vw;
    color: #575757;
    text-shadow: 0.03vw 0.5px black; /* 화면 비율에 따라 테두리 효과가 조절됩니다. */
    align-items: center;
  `;
  const lock = css`
    width: 25%;
    justify-content: end;
    display: flex;
    flex-direction: row;
    height: 100%;
  `;

  const roomParticipants = css`
    width: 18%;
    height: 75%;
    //justify-content: end;
    display: flex;
    margin-right: -1vw;
    flex-direction: row;
    justify-content: center;
    background-color: #cbdbde;
    border-radius: 0.7vw; /* 화면 비율에 따라 테두리 모서리가 조절됩니다. */
    border: solid 0.05vw black; /* 화면 비율에 따라 테두리 두께가 조절됩니다. */
    color: black;
  `;
  const locked = css`
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: end;
    align-items: center;
  `;
  const lockImg = css`
    height: 2vh; /* 화면 비율에 따라 이미지 크기가 조절됩니다. */
    width: auto; /* 이미지의 가로 길이를 자동으로 조절합니다. */
    margin-right: 1vw; /* 화면 비율에 따라 여백이 조절됩니다. */
  `;
  const participants = css`
    /* width: 40%; */
    /* height: 100%; */
    display: flex;
    margin-bottom: 0.2vh;
    font-size: 1.7vh; /* 화면 비율에 따라 폰트 크기가 조절됩니다. */
    justify-content: center;
    align-items: center;
  `;
  return (
    <>
      {roomId ? (
          <div css={room}>
            <div css={roomFirstRow}>
              <div css={roomNumber}># {roomId}</div>
              <div css={roomTitleName}>{roomName}</div>
            </div>
            <div css={roomSecondRow}>
              <div css={roomMaster}>방장 : {masterName}</div>
              <div css={lock}>
                <div css={locked}>
                  {hasPassword ? (
                      <img src={Lock} alt="자물쇠" css={lockImg}/>
                  ) : null}
                </div>
              </div>
              <div css={roomParticipants}>
                <div css={participants}>
                  {numParticipants}/4
                </div>
              </div>
            </div>
          </div>
      ) : (
          <div css={roomMT}></div>
      )}
    </>
  );
};

export default Room;
