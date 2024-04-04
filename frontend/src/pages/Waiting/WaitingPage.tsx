/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import UserCard from "@/components/Waiting/UserCard";
import Chat from "@components/Waiting/Chat";
// import Exit from "@/assets/exit.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  OpenVidu,
  Session,
  SignalOptions,
  SignalEvent,
} from "openvidu-browser";
import Maps from "@/pages/Map/Maps";
import useStore from "@/store";

interface User {
  userID: string;
  profile: string;
  nickname: string;
  isReady: boolean;
}

const waitingPage = 0b0;
const gamePage = 0b1;

const WatingPage: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
  const { setTurn, setPlayerToRoll, setTotalAsset, setCharacterLocation } =
    useStore();
  const [mode, setMode] = useState(waitingPage);
  const navigate = useNavigate();
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  // if (!roomId) {
  //   return <div>Room ID가 없습니다.</div>;
  // }
  const [sessionMap, setSessionMap] = useState<Map<string, Session>>(new Map()); // 방 번호를 키로 하는 세션 맵 추가
  const { state } = useLocation();
  const roomData: { sessionToken: string; hostId: string } | undefined =
    state?.roomData;
  const [ready] = useState<boolean>(false);

  const session = sessionMap.get(roomId!) as Session;

  const initialUsers: User[] = [
    { userID: "", profile: "", nickname: "", isReady: false },
    { userID: "", profile: "", nickname: "", isReady: false },
    { userID: "", profile: "", nickname: "", isReady: false },
    { userID: "", profile: "", nickname: "", isReady: false },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {}, [users]);

  // useEffect(() => {
  //   sessionMap.forEach((session) => {
  //     session.on('signal:enjoy', handleUserJoin);
  //   });
  //   return () => {
  //     sessionMap.forEach((session) => {
  //       session.off('signal:enjoy', handleUserJoin);
  //     });
  //   };
  // }, [sessionMap]);

  useEffect(() => {
    if (session) {
      const handleReceivedMessage = (event: SignalEvent) => {
        if (event.type == "signal:members") {
          // users 데이터 배열을 전달받고 갱신 후 렌더링을 진행
          const receivedData: User[] = JSON.parse(event.data as string);
          console.log("==================");
          console.log("new members! 갱신된 users 확인 : ");
          console.log(JSON.stringify(users[0], null, 2));
          console.log(JSON.stringify(users[1], null, 2));
          console.log(JSON.stringify(users[2], null, 2));
          console.log(JSON.stringify(users[3], null, 2));
          setUsers(receivedData);
          let count = 0;
          for (const user of users) {
            if (user.isReady) {
              count++;
            }
          }
          if (count === 4) {
            // navigate(`/play/${roomId}`, { state: { users }});
            const signalOptions: SignalOptions = {
              data: "",
              type: "gamestart",
            };
            session.signal(signalOptions);
          }
        }

        ///////////////////////// signal : enjoy /////////////////////////
        if (event.type == "signal:enjoy") {
          // 방장은 브로드캐스트로 사용자들에게 정합 후 users 데이터를 전송한다 => "members"
          if (sessionStorage.getItem("user_id") == roomData?.hostId) {
            console.log("Host User 입니다.");

            const tempUsers = [...users];

            // 데이터 정합 알고리즘
            // 0번은 방장
            tempUsers[0].userID = sessionStorage.getItem("user_id") || "";
            tempUsers[0].profile = sessionStorage.getItem("user_profile") || "";
            tempUsers[0].nickname = sessionStorage.getItem("user_name") || "";
            tempUsers[0].isReady = ready || false;

            // const receivedData = JSON.parse(event.data as string);
            const receivedData: User = JSON.parse(event.data as string);

            // 호스트는 이미 추가되었으므로, 참여자만 배열 갱신
            if (receivedData.userID != roomData?.hostId) {
              const emptyIndex = tempUsers.findIndex(
                (user) => user.userID == ""
              );
              if (emptyIndex !== -1) {
                tempUsers[emptyIndex].userID = receivedData.userID;
                tempUsers[emptyIndex].profile = receivedData.profile;
                tempUsers[emptyIndex].nickname = receivedData.nickname;
                tempUsers[emptyIndex].isReady = false;
              }
            }
            console.log("====================");
            console.log(
              "정합한 UserData ==> : " + JSON.stringify(tempUsers, null, 2)
            );

            const signalOptions: SignalOptions = {
              data: JSON.stringify(tempUsers), // 정합된 users 데이터
              type: "members",
            };
            session.signal(signalOptions).then(() => {
              console.log("정합된 데이터 배분");
            });
          }
        }

        ///////////////////////// signal : ready /////////////////////////
        if (event.type == "signal:ready") {
          if (sessionStorage.getItem("user_id") == roomData?.hostId) {
            console.log("Host User 입니다.");
            const tempUsers = [...users];

            const emptyIndex = tempUsers.findIndex(
              (user) => user.userID == event.data
            );
            if (emptyIndex !== -1) {
              tempUsers[emptyIndex].isReady = true;
            }

            const signalOptions: SignalOptions = {
              data: JSON.stringify(tempUsers), // 정합된 users 데이터
              type: "members",
            };
            session.signal(signalOptions).then(() => {
              console.log("정합된 데이터 배분");
            });
          }
        }

        ///////////////////////// signal : gamestart /////////////////////////
        if (event.type == "signal:gamestart") {
          // 다같이 게임페이지로 이동
          // navigate(`/play/${roomId}`, { state: { users } });
                sessionStorage.setItem("player0", "0");
                sessionStorage.setItem("player1", "0");
                sessionStorage.setItem("player2", "0");
                sessionStorage.setItem("player3", "0");
          setMode(gamePage);
        }
      };
      session.on("signal", handleReceivedMessage);

      return () => {
        session.off("signal", handleReceivedMessage);
      };
    }
  }, [session]);

  // 방 접속 시
  useEffect(() => {
    const createSession = async () => {
      const OV = new OpenVidu();
      console.log("세션 참여 시작");
      try {
        const session = OV.initSession();
        await session.connect(roomData!.sessionToken);

        // 세션 이벤트 핸들러 등록
        session.on("signal", (event) => {
          if (event.type === "signal:chat") {
            // 채팅 수신
            console.log("Received chat message:" + event.data);
          } else if (event.type === "signal:ready") {
            // 준비 신호 수신
          } else if (event.type === "signal:enjoy") {
            // 방 참여
            // const receivedData = JSON.parse(event.data as string);
          }
        });

        setSessionMap((prevState) => new Map(prevState.set(roomId!, session))); // 방 번호에 해당하는 세션 맵에 추가

        /////// enjoy signal 통보! ///////
        const message: User = {
          userID: sessionStorage.getItem("user_id") as string,
          profile: sessionStorage.getItem("user_profile") as string,
          nickname: sessionStorage.getItem("user_name") as string,
          isReady: false,
        };

        const signalOptions: SignalOptions = {
          data: JSON.stringify(message),
          type: "enjoy",
        };
        session.signal(signalOptions);
        ///////////////////////////////////

        console.log("Connected to session");
        sendJoinMessage();
      } catch (error) {
        console.error("Error creating or connecting to session:", error);
      }
    };

    if (roomData) {
      createSession();
    }

    return () => {
      // 컴포넌트가 언마운트될 때 세션 해제
      const session = sessionMap.get(roomId!);
      if (session) {
        console.log("세션해제");
        session.disconnect();
      }
    };
  }, [roomData, roomId]);

  const handleExit = async () => {
    try {
      // const response =
      await fetch(
        `${import.meta.env.VITE_APP_PUBLIC_BACKEND_URI}/room/leave/${roomId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      session.disconnect();
      navigate("/lobby");
    } catch (error) {
      console.error("Error leaving:", error);
    }
  };

  // 방장 유저가 참여자에게 입장 메시지를 보내는 함수
  const sendJoinMessage = () => {
    const session = sessionMap.get(roomId!);
    if (session) {
      const signalOptions: SignalOptions = {
        data: "참여자가 입장했습니다.",
        type: "chat",
      };
      session
        .signal(signalOptions)
        .then(() => {
          console.log("Join message successfully sent");
        })
        .catch((error) => {
          console.error("Error sending join message:", error);
        });
    }
  };

  const handleReady = () => {
    const session = sessionMap.get(roomId!);
    if (session) {
      const signalOptions: SignalOptions = {
        data: sessionStorage.getItem("user_id") as string,
        type: "ready",
      };
      session
        .signal(signalOptions)
        .then(() => {
          console.log("Ready message successfully sent");
        })
        .catch((error) => {
          console.error("Error sending ready message:", error);
        });
    }
  };

  // 주사위 굴렸을 때 수신
  useEffect(() => {
    if (session) {
      const handleSignal = (event: SignalEvent) => {
        // 받은 신호가 주사위를 굴리는 신호인지 확인
        if (event.type === "signal:diceRoll") {
          // 주사위 결과를 파싱하여 처리
          const { diceResult } = JSON.parse(event.data as string);
          console.log(diceResult);
        }
      };
      session.on("signal", handleSignal);

      return () => {
        session.off("signal", handleSignal);
      };
    }
  }, [session]);

  // 턴 수신 && 송신
  useEffect(() => {
    if (session) {
      const handleSignal = (event: SignalEvent) => {
        if (event.type === "signal:turn") {
          const { turn } = JSON.parse(event.data as string);
          setTimeout(() => {
            setTurn((turn + 1) % 4);
          }, 3000);
        }
      };
      session.on("signal", handleSignal);

      return () => {
        session.off("signal", handleSignal);
      };
    }
  }, [session]);

  const fetchtotalAssetData = async () => {
    const res = await fetch(`${baseUrl}/game/money`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json(); // 받아온 데이터
    return data;
  };

  useEffect(() => {
    const fetchAndSetTotalAssetData = async () => {
      const totalAssetData = await fetchtotalAssetData();
      setTotalAsset(totalAssetData);
    };
    fetchAndSetTotalAssetData();
  });
  // 플레이어 턴 수신 && 송신
  useEffect(() => {
    if (session) {
      const handleSignal = (event: SignalEvent) => {
        if (event.type === "signal:playerToRoll") {
          const { playerToRoll } = JSON.parse(event.data as string);
          const { modalLoca } = JSON.parse(event.data as string);
          setCharacterLocation(modalLoca);

          if (playerToRoll == 0) {
            sessionStorage.setItem("player0", modalLoca);
          }
          if (playerToRoll == 1) {
            sessionStorage.setItem("player1", modalLoca);
          }
          if (playerToRoll == 2) {
            sessionStorage.setItem("player2", modalLoca);
          }
          if (playerToRoll == 3) {
            sessionStorage.setItem("player3", modalLoca);
          }

          const signalOptions: SignalOptions = {
            data: "",
            type: "gangsin_gogo",
          };

          session.signal(signalOptions);

          setPlayerToRoll((playerToRoll + 1) % 4);
        }
      };

      session.on("signal", handleSignal);
     return () => {
        session.off("signal", handleSignal);
      };
    }
  }, [session]);

  return (
    <>
      {mode === waitingPage ? (
        <>
          <div css={Wrapper}>
            <div css={roomheader}>
              <div css={roomDetail}>
                <div css={roomNo}># {roomId!}</div>
                <div css={roomTitle}>모두모여라</div>
              </div>
              <div css={readyButton} onClick={handleReady}>
                {ready ? "준비완료" : "준비하기"}
              </div>
              <div css={exit} onClick={handleExit}>
                방 나가기
              </div>
            </div>
            <div css={totalContainer}>
              <UserCard users={users} />
              <Chat session={sessionMap.get(roomId!) || null} />
            </div>
          </div>
        </>
      ) : (
        <>
          <Maps session={sessionMap.get(roomId!) || null} users={users} />
        </>
      )}
    </>
  );
};

export default WatingPage;

const Wrapper = css`
  /* background-image: url("../../src/assets/lobby_background2.webp"); */
  /* background-size: cover;
    background-repeat: no-repeat;    */
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const totalContainer = css`
  width: 65%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const roomheader = css`
  width: 65%;
  height: 15%;
  display: flex;
  flex-direction: row;
`;

const roomDetail = css`
  width: 60%;
  height: 40%;
  margin-top: 6vh;
  display: flex;
  flex-direction: row;
  font-size: 1.2vw;
  font-weight: bold;
  justify-content: space-evenly;
  background-color: #5e6668;
  border: white 5px solid;
  border-radius: 10px;
`;
const readyButton = css`
  width: 13%;
  height: 35%;
  margin-top: 7vh;
  margin-left: 8vw;
  display: flex;
  flex-direction: row;
  color: #5e6668;
  font-size: 1vw;
  font-weight: bold;
  justify-content: space-evenly;
  background-color: #fff1aa;
  border: white 5px solid;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`;
const exit = css`
  width: 13%;
  height: 35%;
  margin-top: 7vh;
  margin-left: 0.56vw;
  display: flex;
  flex-direction: row;
  color: #5e6668;
  font-size: 1vw;
  font-weight: bold;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  background-color: #fff1aa;
  border: white 5px solid;
  border-radius: 10px;
  cursor: pointer;
`;

const roomNo = css`
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2vw;
  justify-content: start;
`;

const roomTitle = css`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2vw;
  justify-content: start;
`;
