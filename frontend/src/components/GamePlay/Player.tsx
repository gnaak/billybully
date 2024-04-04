/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import useStore from "@/store/index";
import InGameChat from "@components/GamePlay/InGameChat";
import { Session } from "openvidu-browser";


interface ChatProps {
  session: Session | null;
}

const Player: React.FC<ChatProps> = ({ session }) => {
  const { privateAsset, totalAsset, situationCard } = useStore();
  return (
    <>
      {totalAsset ? (
        <>
          <div css={player1Outline}>
            <div css={playerStyle}>
              <img
                src={totalAsset?.myProperty.memberProfile}
                css={player1Profile}
              />
              <div css={player1Info}>
                {privateAsset ? (
                  <div css={playerNameStyle}>{privateAsset.memberName}</div>
                ) : (
                  <div css={playerNameStyle}>
                    {totalAsset.myProperty.memberName}
                  </div>
                )}
                <div css={playerAsset}>
                  {privateAsset ? (
                    <>
                      <div>현재 자산 : {privateAsset.cash}</div>
                      <div>부채 : {privateAsset.loan}</div>
                      <div>
                        총 자산 : {privateAsset.cash - privateAsset.loan}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>현재 자산 : {totalAsset.myProperty.cash}</div>
                      <div>부채 : {totalAsset.myProperty.loan}</div>
                      <div>
                        총 자산 :{" "}
                        {totalAsset.myProperty.cash -
                          totalAsset.myProperty.loan}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div css={player2Outline}>
            <div css={playerStyle}>
              <img
                src={totalAsset.propertyList[0].memberProfile}
                css={player1Profile}
              />
              <div css={player1Info}>
                <div css={playerNameStyle}>
                  {totalAsset.propertyList[0].memberName}
                </div>
                <div css={playerAsset}>
                  <div>현재 자산 : {totalAsset.propertyList[0].cash}</div>
                  <div>부채 : {totalAsset.propertyList[0].loan}</div>
                  <div>
                    총 자산 :{" "}
                    {totalAsset.propertyList[0].cash -
                      totalAsset.propertyList[0].loan}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={player3Outline}>
            <div css={playerStyle}>
              <img
                src={totalAsset.propertyList[1].memberProfile}
                css={player1Profile}
              />
              <div css={player1Info}>
                <div css={playerNameStyle}>
                  {totalAsset.propertyList[1].memberName}
                </div>
                <div css={playerAsset}>
                  <div>현재 자산 : {totalAsset.propertyList[1].cash}</div>
                  <div>부채 : {totalAsset.propertyList[1].loan}</div>
                  <div>
                    총 자산 :{" "}
                    {totalAsset.propertyList[1].cash -
                      totalAsset.propertyList[1].loan}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={player4Outline}>
            <div css={playerStyle}>
              <img
                src={totalAsset.propertyList[2].memberProfile}
                css={player1Profile}
              />
              <div css={player1Info}>
                <div css={playerNameStyle}>
                  {totalAsset.propertyList[2].memberName}
                </div>
                <div css={playerAsset}>
                  <div>현재 자산 : {totalAsset.propertyList[2].cash}</div>
                  <div>부채 : {totalAsset.propertyList[2].loan}</div>
                  <div>
                    총 자산 :{" "}
                    {totalAsset.propertyList[2].cash -
                      totalAsset.propertyList[2].loan}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div css={playerInfo}>
        <div css={playerSitu}>
          <div style={{ margin: "12px" }}>상황</div>
          <div css={playerSituInfo}>
            <br />
            <br />
            1. {situationCard?.situations[0].name}
            <br />
            2. {situationCard?.situations[1].name}
            <br />
            3. {situationCard?.situations[2].name}
            <br />
            4. {situationCard?.situations[3].name}
            <br />
            5. {situationCard?.situations[4].name}
          </div>
        </div>
        <div css={playerAssetInfo}>
          <div css={playerAssetList}>
            <div
              style={{
                color: "black",
                fontSize: "2.2vh",
                marginBottom: "12px",
              }}
            >
              재테크 카드
            </div>
            {privateAsset ? (
              <>
                {privateAsset.fintechList?.map((realEstate, index) => (
                  <div key={index}>
                    {realEstate.type} : {realEstate.name}
                    <br />
                  </div>
                ))}
              </>
            ) : (
              <>
                {totalAsset?.myProperty.fintechList?.map(
                  (realEstate, index) => (
                    <div key={index}>
                      {realEstate.type} : {realEstate.name}
                      <br />
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div css={chat}></div> */}
      <div css={chat}>
        <InGameChat session={session} />
      </div>
      <Link to="/lobby" css={exitStyle}>
        방 나가기
      </Link>
    </>
  );
};

export default Player;

const player1Outline = css`
  position: absolute;
  top: 80%;
  left: 55%;
  height: 13vh;
  width: 36vh;
  border-radius: 22px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.2vw;
`;

const player2Outline = css`
  position: absolute;
  top: 80%;
  left: 5%;
  height: 13vh;
  width: 36vh;
  border-radius: 22px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.2vw;
`;

const player3Outline = css`
  position: absolute;
  top: 5%;
  left: 5%;
  height: 13vh;
  width: 36vh;
  border-radius: 22px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.2vw;
`;
const player4Outline = css`
  position: absolute;
  top: 5%;
  left: 55%;
  height: 13vh;
  width: 36vh;
  border-radius: 22px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.2vw;
`;
const playerStyle = css`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-color: #799297;
  display: flex;
  align-items: center;
`;
const player1Profile = css`
  margin: 20px;
  aspect-ratio: 1;
  height: 70%;
  border-radius: 50%;
  object-fit: cover;
  border: white solid 1px;
`;
const player1Info = css`
  width: 60%;
  height: 100%;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const playerNameStyle = css`
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  text-align: start;
  text-shadow: 0.05vw 0.05vw 0px black;
`;
const playerAsset = css`
  font-size: 0.9vw;
  text-align: start;
  text-shadow: 0.05vw 0.05vw 0px black;
`;
const playerInfo = css`
  position: absolute;
  top: 5%;
  left: 80%;
  height: 55vh;
  width: 34vh;
  border: solid #ffe08f 4px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const playerSitu = css`
  margin: 1vh;
  height: 34%;
  width: 93%;
  color: black;
  border-radius: 10px;
  background-color: #ffe08f;
  font-weight: bold;
  font-size: 1.2vw;
`;
const playerSituInfo = css`
  display: flex;
  margin: 1.5vh;
  height: 32%;
  width: 93%;
  color: #5c5c5c;
  font-weight: bold;
  font-size: 1vw;
  flex-direction: row;
  align-items: center;
`;
// const situDetail = css`
//   width: 100%;
//   height: 25%;
//   align-items: center;
//   display: flex;
//   justify-content: center;
// `;
const playerAssetInfo = css`
  margin: 0.5vh;
  height: 59%;
  width: 93%;
  border-radius: 10px;
  display: flex;
  background-color: #ffe08f;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 1vw;
  font-weight: bold;
`;
const playerAssetList = css`
  display: flex;
  flex-direction: column;
  color: #5c5c5c;
  width: 90%;
  margin-top: 1vh;
`;

const chat = css`
  position: absolute;
  top: 62%;
  left: 80%;
  height: 27vh;
  width: 34vh;
  border: solid #ffe08f 4px;
  border-radius: 20px;
  background-color: white;
  display: flex;
`;
const exitStyle = css`
  position: absolute;
  top: 92%;
  left: 88.5%;
  height: 5vh;
  width: 18vh;
  border: solid 3px white;
  background-color: #979693;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-size: 1vw;
  text-decoration-line: none;
  cursor: pointer;
`;

// const buttonStyle = css`
//   position: absolute;
//   top: -30%;
//   left: 25%;
//   transform: translate(-50%, -50%);
//   border: solid white 5px;
//   background-color: #f8c56a;
//   width: 10vw;
//   height: 7vh;
//   cursor: pointer;
//   border-radius: 20px;
//   font-size: 1rem;
//   color: white;
//   font-weight: bold;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const buttonStyle2 = css`
//   position: absolute;
//   top: -30%;
//   left: 75%;
//   transform: translate(-50%, -50%);
//   border: solid white 5px;
//   background-color: #f8c56a;
//   width: 10vw;
//   height: 7vh;
//   cursor: pointer;
//   border-radius: 20px;
//   font-size: 1rem;
//   color: white;
//   font-weight: bold;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
