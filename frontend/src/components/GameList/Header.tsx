/** @jsxImportSource @emotion/react */
import { useEffect , useState } from "react";
import { css } from "@emotion/react"; 
import useModal from "@/hooks/useModal";
import CreateRoom from "./CreateRoom";
import SearchRoom from "./SearchRoom"; 

const Gameheader = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [isOpenSituation, openSituation, closeSituation] = useModal();
  const [isOpenAssets, openAssets, closeAssets] = useModal();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    sessionStorage.getItem('user_profile') as string
  ); 
  const [profileName, setProfileName] = useState<string | undefined>(
    sessionStorage.getItem('user_name') as string
  );
  
  useEffect(() => {
    const storedUserProfile = sessionStorage.getItem("user_profile");
    const storedUserId = sessionStorage.getItem("user_id");
    const storedUserName = sessionStorage.getItem("user_name");
    console.log("프로필 : " + storedUserProfile);
    console.log("이름 : " + storedUserName);

    if (storedUserProfile && storedUserId && storedUserName) {
      setProfileImage(storedUserProfile);
      setProfileName(storedUserName);
    }
  }, [accessToken]);
 
  return (
    <>
      <div css={header}>
        <div css={playerInfo}>
          <div css={playerProfilebox}>
          <img src={profileImage} alt="프로필 사진" css={playerProfile} />
          </div>
          <div css={playerName}>{profileName}</div>
        </div>
        <div css={roomAssets}>
          <div css={roomSearch} onClick={openSituation}>
            방 만들기
          </div>
          <div css={roomSearch} onClick={openAssets}>
            방 찾기
          </div>
        </div>
      </div>
      {isOpenSituation ? <CreateRoom close={closeSituation} /> : null}
      {isOpenAssets ? <SearchRoom close={closeAssets} /> : null}
    </>
  );
};

export default Gameheader;

const header = css`
display: flex;
align-items: center;
justify-content: space-evenly;
height: 12%;
width: 90%;
`;

const playerInfo = css`
  height: 70%;
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8%;
`;

const playerProfilebox = css`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const playerProfile = css`
  aspect-ratio: 1;
  object-fit: cover;
  height: 100%;
  border-radius: 50%;
  border: white 1px solid;
`;

const playerName = css`
  color: black;
  font-size: 1.2vw;
  font-weight: bold;
`;

const roomAssets = css`
  height: 70%;
  width: 75%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: end;
  align-items: center;
`;

const roomSearch = css`
background-color: #FFE08F;
color: #5C5C5C;
height: 60%;
width: 11%;
border-radius: 15px;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
font-size: 1vw;
cursor: pointer;
border: 2px solid white;
position: relative; /* 모달을 화면 맨 앞에 나타내기 위해 위치 속성을 상대적으로 설정합니다. */
z-index: 999; /* 모달을 다른 요소들보다 위에 표시하도록 z-index 값을 설정합니다. */
`;
