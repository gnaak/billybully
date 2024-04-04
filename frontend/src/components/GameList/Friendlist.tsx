/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import useStore from "@/store/index"; 
import axios from "axios";  
import { useNavigate } from "react-router-dom";


const Friendlist = () => {
  const navigate = useNavigate();
  const logout = () => {
    // const userInfo: UserInfo | null = useStore((state) => state.userInfo); 
    const user_id = localStorage.getItem('user_id')
    const accessToken = localStorage.getItem('accessToken');
    console.log("로그아웃을 시도합니다 => " + user_id) 
    if (user_id) {
      const logoutUrl = `${import.meta.env.VITE_APP_PUBLIC_BACKEND_URI}/oauth/logout?id=${user_id}`;

      // GET 요청 보내기
      axios.get(logoutUrl,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response) 
        // window.location.href = 'http://localhost:3000';  
        navigate("/");
        // accessToken이랑 로컬스토리지에 저장한 것들 다 삭제!!
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpiration");
        localStorage.removeItem("user_id"); 
        console.log("localStorage 정보 삭제")
      })
      .catch(error => {
        console.error("로그아웃 요청 중 오류 발생:", error);
      });
    } else {
      console.error("사용자 정보가 유효하지 않습니다.");
    } 
  };



  return (
    <div css={friendListbox}>
      <div css={outerbox2}>
        <button css={logoutBox} onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Friendlist;



const friendListbox = css`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  font-size: 1.2vw;
  font-weight: bold;
  flex-direction: column;
  gap: 10px;
`;


const outerbox2 = css`
  height: 10%;
  width: 90%;
  display: flex;
  font-size: 0.9vw;
  font-weight: bold;
  justify-content: end;
  align-items: center;
`;

const logoutBox = css`
  height: 5%;
  width: 8%;
  border-radius: 15px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1vw;
  font-weight: bold;
  border: 2px solid white;
  top: 88%;
  left: 82%;
  cursor: pointer;
  transform: translate(70%, 40%);
  position: fixed;
`;

