/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import profile from "@/assets/profile.png";

export interface UserCardProps {
  users: { profile: string; nickname: string; isReady: boolean }[];
}

const UserCard: React.FC<UserCardProps> = ({ users }) => {
  return (
    <>
      <div css={userContainer}>
        <div css={userCard}>
          {users.map((user, index) => (
            <div key={index} css={userInfo}>
              <img src={user.profile || profile} css={profileStyle} />

              <div css={userName}>{user.nickname}</div>
              {user.isReady ? (
                <div css={isReady}>READY</div>
              ) : (
                <div css={isnotReady}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <div css={container}></div> */}
    </>
  );
};

export default UserCard;

const userContainer = css`
  display: flex;
  height: 45%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ffe08f;
  border-radius: 20px;
  border: solid black 1px;
  flex-direction: row;
`;
const userCard = css`
  display: flex;
  width: 80%;
  height: 90%;
  justify-content: space-between;
  flex-direction: row;
`;

const userInfo = css`
  background-color: white;
  border-radius: 20px;
  border: solid black 1px;
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px;
`;

const profileStyle = css`
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid white;
  width: 50%;
  margin: 15px;
`;
const userName = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  color: #575757;
  font-weight: bold;
  width: 90%;
  height: 20%;
`;
const isReady = css`
  width: 80%;
  height: 15%;

  background-color: white;
  border-radius: 10px;
  color: #f8c56a;
  font-size: 0.9vw;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const isnotReady = css`
  width: 80%;
  height: 15%;
`;
