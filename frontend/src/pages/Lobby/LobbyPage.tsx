/* eslint-disable react-hooks/exhaustive-deps */
  /** @jsxImportSource @emotion/react */
  import React, { useEffect } from "react"; 
  import { useLocation } from "react-router-dom";
  import { css } from "@emotion/react"
  import { useAuth } from "@/store/AuthProvider"
  import RoomAsset from "@components/GameList/RoomAsset";
  import Gameheader from "@components/GameList/Header";


const LobbyPage: React.FC = () => { 
  const { setAccessToken } = useAuth(); // AuthProvider로부터 accessToken 상태와 설정 함수를 가져옴 
  const location = useLocation(); 
const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    console.log("get 인가 code? : " + code);
    console.log("accessToken ==> " + localStorage.getItem("accessToken"));

    if (code && localStorage.getItem("accessToken") == null) {
      // accessToken이 없는 경우에만 로그인 요청을 시도합니다.
      console.log("로그인 시도한다");
      fetch(
        import.meta.env.VITE_APP_PUBLIC_BACKEND_URI +
          "/oauth/login/KAKAO?authCode=" +
          code,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("로그인 요청 실패");
          }
        })
        .then((data) => {
          const newAccessToken = data.accessToken; // 새로운 accessToken 추출
          setAccessToken(newAccessToken); // 전역 상태 업데이트
          localStorage.setItem("accessToken", newAccessToken); // 로컬 스토리지에
          localStorage.setItem(
            "accessTokenExpiration",
            (new Date().getTime() + 3600000).toString()
          );
          localStorage.setItem("refreshToken", data.refreshToken); // 추후 다른 방식으로 저장하기
          localStorage.setItem("user_id", data.authResponse.memberId); // 추후 다른 방식으로 저장하기
          localStorage.setItem("user_name", data.authResponse.memberName);
          sessionStorage.setItem("user_id", data.authResponse.memberId);
          sessionStorage.setItem("user_name", data.authResponse.memberName);
          sessionStorage.setItem(
            "user_profile",
            data.authResponse.memberProfile
          );
          console.log("로그인 성공");
        })
        .catch((error) => {
          console.error("로그인 요청 에러:", error);
        });
    } else {
      console.log("accessToken이 이미 있으므로 로그인을 시도하지 않습니다.");
    }
  }, [accessToken]);

  return (
    <>
      <div css={Wrapper}>
        <Gameheader />
        <RoomAsset />
      </div>
    </>
  );
};

export default LobbyPage;

const Wrapper = css`
/* background-image: url("src/assets/lobby_background2.webp"); */
background-size: cover;
background-repeat: no-repeat;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
`;
