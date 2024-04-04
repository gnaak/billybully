import axios, { AxiosResponse } from 'axios';

export const checkAccessTokenExpiration = async () => {
  const currentTime = new Date().getTime();
  const expirationTime = localStorage.getItem('accessTokenExpiration');
  if (expirationTime && currentTime > Number(expirationTime)) {
    // accessToken 만료!!
    console.log("accessToken 만료!!!! 재요청합니다!"); 
    try {
      let refreshToken = localStorage.getItem('refreshToken');
      const refreshResponse: AxiosResponse<any> = await axios.get(import.meta.env.VITE_APP_PUBLIC_BASE_URL +
        '/oauth/refresh', {
        headers: {
          Refresh: `${refreshToken}`,
        },
      });
      localStorage.setItem("accessToken", refreshResponse.data.accessToken); // 로컬 스토리지에 새로운 accessToken 저장
    } catch (error) {
      console.error('Error while refreshing access token:', error);
    }
  }
};