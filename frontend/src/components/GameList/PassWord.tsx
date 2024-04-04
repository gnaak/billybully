/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import useStore from "@/store";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios'; 


// import axios from "axios";

interface PassWordProps {
  close: () => void;
}

const PassWord = ({ close }: PassWordProps) => {
  const accessToken = localStorage.getItem("accessToken");
  const { roomnumber, setPassword } = useStore();
  const [inputValue2, setInputValue2] = useState<string>("");
  const navigate = useNavigate();

  const data = {
    id: roomnumber,
    password: inputValue2,
  };
  
// 방 입장(비밀번호)
const mutation = useMutation(async () => {
  const response: AxiosResponse = await axios.post(import.meta.env.VITE_APP_PUBLIC_BASE_URL +
    '/room/enter', {
      id : data.id,
      password : data.password
    }, { 
    headers: {
      Authorization: `Bearer ${accessToken}`, 
    },
  });  

  const responseData = response.data;
  navigate(`/waiting/${responseData.id}`, {state: {responseData} }); 
  console.log(responseData); // 응답 데이터를 출력하거나 사용합니다.
 

    return responseData;
  });

const handleEnterRoom = async () => {
  try {
    const data = await mutation.mutateAsync();
    // mutation.mutateAsync()로부터 반환된 데이터를 사용합니다.
    console.log("입장!: ",data); // 응답 데이터를 출력하거나 사용합니다.


  } catch (error) {
    console.error("Failed to enter room:", error);
  }
};


  const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };

  const backGround = css`
    position: absolute;
    top: 35%;
    left: 25%;
    background-color: white;
    border-radius: 20px;
    height: 30%;
    width: 50%;
    padding: 10px;
    border: 1px solid black;
  `;

  const coloredArea = css`
    display: flex;
    flex-direction: column;
    background-color: #f9d188;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
  `;

  const exitButton = css`
    position: absolute;
    top: 8%;
    left: 90%;
    cursor: pointer;
  `;

  const roomAsset = css`
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  `;

  const roomcreate = css`
    height: 20%;
    width: 30%;
    background-color: white;
    border-radius: 10px;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    border: 1px solid black;
  `;

  const createRoom = css`
    height: 20%;
    width: 30%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    border-radius: 10px;
    border: 1px solid black;
    cursor: pointer;
    text-decoration: none;
  `;
  return (
    <div css={backGround}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        <div css={roomAsset}>
          <input
            id="roomName"
            type="text"
            value={inputValue2}
            placeholder="비밀번호"
            // onClick={handleInputClick2}
            onChange={handleInputChange2}
            css={roomcreate}
          />

          <div
            css={createRoom}
            onClick={() => {
              setPassword("");
              console.log(inputValue2);
              console.log(roomnumber);
              handleEnterRoom();
            }}
          >
            입장
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassWord;
