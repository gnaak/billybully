/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import profile1 from "@/assets/profile.jpg";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import fireworkBackground from '@/assets/firework.gif'; // 이미지 경로


interface EndGameProps {
  close: () => void;
}

const EndGame = ({ close }: EndGameProps) => {
  const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
  const { roomId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  // 게임 끝났을 때 로직
  const data = {};
  const endgamePost = useMutation(async () => {
    const response = await fetch(`${baseUrl}/game/${roomId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response)
  });
  const handleEndGame = async () => {
    try {
      const data = await endgamePost.mutateAsync();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    navigate("/lobby");
  };

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
  background-image: url(${fireworkBackground}); // 배경 이미지 설정
    background-size: cover; // 배경 이미지를 컨테이너에 맞게 조절
    width: 100%;
    height: 100%;
    background-color: black;
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
    color: #FBFDA4;
    font-size: 7rem;
    align-items: center;
    width: 90%;
    text-align: center;
    justify-content: center;
  `;

  const winPlayer = css`
    height: 60%;
    width: 70%;
    display: flex;
    flex-direction: column;
  `;
  

  const exitButton = css`
    position: absolute;
    top: 3%;
    left: 93%;
    cursor: pointer;
  `;


const winPlayerInfo = css`
  display: flex;
  flex-direction: column; /* 아래로 정렬하기 위해 */
  align-items: center; /* 가운데 정렬 */
`;

const player1ProfileContainer = css`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 240px; /* 이미지의 2배 크기 */
  height: 240px; /* 이미지의 2배 크기 */
  margin: 20px;
  border: solid;
  overflow: hidden;
  border-radius: 50%; /* 테두리를 둥글게 */
`;

const player1Profile = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(2);
  border-radius: 50%;
`;

const player1Name = css`
  margin-top: 10px; /* 이미지와의 간격 조절 */
  text-align: center; /* 텍스트 가운데 정렬 */
  font-size: 3rem;
`;

  return (
    <div css={situationStyle}>
  <div css={coloredArea}>
    <img
      src={exit}
      alt="종료하기"
      css={exitButton}
      onClick={() => {
        close();
        handleEndGame();
      }}
    />
    <div css={winStyle}> WIN!! </div>
    <div css={winPlayer}>
      <div css={winPlayerInfo}>
        <div css={player1ProfileContainer}>
          <img src={profile1} alt="player1proifle" css={player1Profile} />
        </div>
        <div css={player1Name}>이근학</div>
      </div>
    </div>
  </div>
</div>
  );
};

export default EndGame;
