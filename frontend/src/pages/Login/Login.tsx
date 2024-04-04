/** @jsxImportSource @emotion/react */
import React from 'react'; 
import { css } from "@emotion/react";
import logo from '@/assets/logo_remove.png'
import kakaologin from '@/assets/kakao_login.png'

const Login: React.FC = () => {

  const login_kakao = () => {   
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
    //   import.meta.env.VITE_APP_PUBLIC_KAKAO_REST_API_KEY
    // }&redirect_uri=${import.meta.env.VITE_APP_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_APP_PUBLIC_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_APP_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  }; 
  
  return ( 
    <div css={Wrapper}> 
      <div css={container} >
        <img src={logo} alt="Logo" css={App_logo} />
        <div css={login_container}> 
          <button onClick={login_kakao} css={login_button}>
            <img src={kakaologin} css={login_img} alt="kakaologin" /> 
          </button> 
        </div>
      </div> 
      </div>

  );
};

export default Login;


const Wrapper = css`
  background-image: url("");
  background-size: cover;
  background-repeat: no-repeat;
  height: 98vh;
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const container = css`
  text-align: center;
`;

const App_logo = css`
  text-align: center;
  width: 80vh;
  pointer-events: none;
  align-items: center;
  position: absolute; /* 절대 위치로 설정합니다. */
  top: 60%; /* 상단에서의 위치를 조정합니다. */
  left: 50%; /* 좌측에서의 위치를 조정합니다. */
  transform: translate(-50%, -90%); /* 요소를 가운데로 이동시킵니다. */
`;

const login_container = css`
  display: flex;  
  flex-direction: column;  
  margin: 20px;
  padding: 10px;
  align-items: center;
  position: absolute; /* 절대 위치로 설정합니다. */
  top: 50%; /* 상단에서의 위치를 조정합니다. */
  left: 50%; /* 좌측에서의 위치를 조정합니다. */
  transform: translate(-60%, 140%); /* 요소를 가운데로 이동시킵니다. */
`;

const login_img = css` 
  width: 13vw;
`;

const login_button = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer; 
`;
