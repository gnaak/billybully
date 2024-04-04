/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";
import useModal from "@/hooks/useModal";

interface CreateRoomProps {
  close: () => void;
}

interface roomListDataProps {
  id: number | null;
  name: string | null;
  maxParticipants: number | null;
  numParticipants: number | null;
  password: number | null;
  masterId: string | null;
  gameStarted: boolean | null;
  players: number | null;
}
const SearchRoom = ({ close }: CreateRoomProps) => {
  const [isOpenSituation, openSituation, closeSituation] = useModal();
  const [inputValue, setInputValue] = useState("방 번호 입력");
  const handleInputClick = () => {
    setInputValue("");
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const navigate = useNavigate();
  const { roomListData } = useStore();

  const navigateToWaitingRoom = (
    rooms: roomListDataProps[],
    inputValue: string
  ) => {
    for (const room of rooms) {
      if (room.id == parseInt(inputValue)) {
        navigate(`/waiting/${inputValue}`);
      }
      else {
        openSituation()
      }
      return;
    }
  };
  console.log(roomListData);
  const backGround = css`
    z-index: 999;
    position: absolute;
    top: 30%;
    left: 30%;
    background-color: white;
    border-radius: 20px;
    height: 40%;
    width: 40%;
    padding: 10px;
    border: 1px solid black;
  `;

  const coloredArea = css`
    display: flex;
    flex-direction: column;
    background-color: #f8c56a;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    gap: 50px;
    align-items: center;
  `;

  const exitButton = css`
    position: absolute;
    top: 5%;
    left: 90%;
    cursor: pointer;
  `;

  const roomAsset = css`
    margin-top: 15%;
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;
  const roomAsset2 = css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const roomcreate = css`
    height: 100%;
    width: 50%;
    background-color: white;
    border-radius: 20px;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
  `;

  const createRoom = css`
    height: 15%;
    width: 30%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid black;
    text-decoration: none;
  `;

  const alertStyle = css`
    position: absolute;
    top: 85%;
    left: 30%;
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
  `
  console.log(roomListData)
  return (
    <div css={backGround}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        <div css={roomAsset}>
          <div css={roomAsset2}>
            <input
              id="roomName"
              type="text"
              value={inputValue}
              placeholder="방 번호 입력"
              onClick={handleInputClick}
              onChange={handleInputChange}
              css={roomcreate}
            />
          </div>
        </div>
        {roomListData ? (
          <>
            <div
              onClick={() =>
                navigateToWaitingRoom(roomListData?.roomList, inputValue)
              }
              css={createRoom}
            >
              입장
            </div>
          </>
        ) : null}
      </div>
      {isOpenSituation ? (
        <div css={alertStyle} onClick={closeSituation}>입장할 수 있는 방이 없습니다.</div>
      ) : null}
    </div>
  );
};

export default SearchRoom;
