/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import { ChangeEvent, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios'; 
import { checkAccessTokenExpiration } from '@/authUtils';

interface CreateRoomProps {
  close: () => void;
}

// const OPENVIDU_SERVER_URL = `https://j10a401.p.ssafy.io:4443/`;
// const OPENVIDU_SERVER_SECRET = 'team401';

const CreateRoom = ({ close }: CreateRoomProps) => {  
  const [inputValue, setInputValue] = useState("방 제목");  
  const [inputValue2, setInputValue2] = useState<string|null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleInputClick = () => {
    setInputValue("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }; 

  const handleInputClick2 = () => {
    setInputValue2(null);
  };

  const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };
  
  const handleCheckboxChange = () => {
    setIsPrivate((prevState) => !prevState);
  };

  const navigate = useNavigate(); 
  const handleCreateRoom = async () => {
    try {  
      const accessToken = localStorage.getItem('accessToken');
      console.log("accessToken ==> " + accessToken) 
      // !accessToken 예외처리!! (로그인 화면으로?)
      await checkAccessTokenExpiration();

      const response: AxiosResponse = await axios.post(import.meta.env.VITE_APP_PUBLIC_BASE_URL +
        '/room/create', { 
          name : inputValue,
          password : inputValue2
      }, { 
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    }); 
 
      // const roomData: RoomData = response.data;
      const roomData = response.data;  
      const hostID = sessionStorage.getItem('user_id') || "-1";
      console.log("create roomData ==> " + JSON.stringify(roomData, null, 2));
      navigate(`/waiting/${roomData.id}`, {state: {roomData} });
      navigate(`/waiting/${roomData.id}`, { state: { roomData: { ...roomData, hostId: hostID } } });

    } catch (error) {   
      console.error('Error while creating room:', error); 
    } 
  };
 
  return (
    <div css={backGround}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        <div css={logoArea}>
          {/*<img src={Logo} alt="로고" css={logo} />*/}
          방 만들기
        </div>
        <div css={roomAsset}>
          <div css={roomAsset2}>
            <input
              id="roomName"
              type="text"
              value={inputValue}
              placeholder="방 제목"
              onClick={handleInputClick}
              onChange={handleInputChange}
              css={roomcreate}
            />
          </div>
          <div css={roomAsset2}>
            <input
              id="roomName"
              type="text"
              value={inputValue2 || ""}
              placeholder="비밀번호"
              onClick={handleInputClick2}
              onChange={handleInputChange2}
              css={roomcreate}
            />
            <div css={password}>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={handleCheckboxChange}
                css={checkbox}
              />
              <div css={hidden}>{isPrivate ? "없음" : ""}</div>
            </div>
          </div>
        </div>
        <div css={createRoom} onClick={handleCreateRoom}>
          확인
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;



const backGround = css`
position: absolute;
background-color: rgba(0, 0, 0, 0.7);
height: 100%;
width: 100%;
z-index: 999; 
`;

const coloredArea = css`
display: flex;
flex-direction: column;
background-color: #f9d188;
height: 50%;
width: 40%;
border-radius: 20px;
border : solid white 7px;
gap: 50px;
align-items: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const logoArea = css`
height: 15%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: #596769;
font-size : 2.5vw;
font-weight: bold;
margin-top: 10%;
  text-shadow: -1px -1px 0 WHITE,
  1px -1px 0 WHITE,
  -1px 1px 0 WHITE,
  1px 1px 0 WHITE; /* 텍스트 그림자 */
`;

const exitButton = css`
position: absolute;
top: 3%;
left: 93%;
cursor: pointer;
`;

const roomAsset = css`
height: 25%;
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
`;
const roomAsset2 = css`
height: 50%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const roomcreate = css`
height: 100%;
width: 50%;
background-color: white;
border-radius: 10px;
color: darkgray;
font-size: 1vw;
font-weight: bold;
justify-content: center;
align-items: center;
display: flex;
text-align: center;
border: 1px solid black;
`;
const password = css`
position: absolute;
width: 20%;
height: 5%;
top: 65%;
left: 76%;
display: flex;
flex-direction: row;
gap: 10px;
`;
const checkbox = css`
aspect-ratio: 1;
height: 100%;
  position: absolute;
  top: -50%;
  left: 20%;
  transform: translate(-50%, -50%);
background-color: white;
border: 1px solid black;
`;

const hidden = css`
height: 100%;
width: 50%;
color: Gray;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.1vw;
font-weight: bold;
  top: -100%;
  left: 20%;
  transform: translate(57%, -90%);
`;

const createRoom = css`
height: 10%;
width: 20%;
background-color: #6E878B;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-size: 1.1vw;
font-weight: bold;
border-radius: 10px;
border: 3px solid WHITE;
cursor: pointer;
text-decoration: none;
margin-bottom: 2vw;
`;
