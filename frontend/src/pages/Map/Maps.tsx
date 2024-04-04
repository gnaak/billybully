/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  OrthographicCamera,
} from "@react-three/drei";
import Player from "@/components/GamePlay/Player";
import Board from "@/components/GamePlay/Board";
import Dice from "@/components/GamePlay/Dice";
import Dog from "@components/Characters/Dog";
import Chicken from "@components/Characters/Chicken";
import Bear from "@components/Characters/Bear";
import Camel from "@components/Characters/Camel";
import Situation from "@/components/Card/Situation";
import Loan from "@/components/Card/Loan";
import useModal from "@/hooks/useModal";
import Asset from "@/components/Card/Asset";
import useStore from "@/store";
import Issue from "@components/Card/Issue";
import SellAsset from "@components/Card/SellAsset";
import { useMutation } from "react-query";
import Multi from "@components/Card/Multi";
import Half from "@components/Card/Half";
import Start from "@components/Card/Start";
import Start2 from "@components/Card/Start2";
import { useParams } from "react-router-dom";
import Repayment from "@components/Card/Repayment";
import EndGame from "@components/GamePlay/EndGame";
import { Session } from "openvidu-browser";
import { SignalEvent } from "openvidu-browser";
// import Chat from "@components/Waiting/Chat";

interface User {
  userID: string;
  profile: string;
  nickname: string;
}
interface ChatProps {
  session: Session | null;
  users: User[];
}

const Maps: React.FC<ChatProps> = ({ session, users }) => {
  const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
  const [isOpenRepayment, openRepayment, closeRepayment] = useModal();
  const [isOpenLoan, openLoan, closeLoan] = useModal();
  const [isOpenSituation, openSituation, closeSituation] = useModal();
  const [isOpenAssets, openAssets, closeAssets] = useModal();
  const [isOpenSellAssets, openSellAssets, closeSellAssets] = useModal();
  const [isOpenIssue, openIssue, closeIssue] = useModal();
  const [isOpenHalf, openHalf, closeHalf] = useModal();
  const [isOpenDouble, openDouble, closeDouble] = useModal();
  const [isOpenStart, openStart, closeStart] = useModal();
  const [isOpenStart2, openStart2, closeStart2] = useModal();
  const [isOpenEnd, openEnd, closeEnd] = useModal();
  const [location, setLocation] = useState<number[]>([0, 0, 0, 0]);
  const [diceScore, setTotalScore] = useState<number>(0);
  const [modalLoca, setModalLoca] = useState<number[]>([0, 0, 0, 0]);
  const [turn, setTurn] = useState<number>(0);
  const handleDataDice = (score: number) => {
    setTotalScore(score);
  };

  const [totalLocation, setTotalLocation] = useState<number[]>([0, 0, 0, 0]);
  const accessToken = localStorage.getItem("accessToken");
  const {
    playerToRoll,
    characterLocation,
    fintechId,
    situationId,
    setFintechData,
    totalAsset,
    cardId,
    // userInfo,
    setDestination,
    setSalary,
    salary,
    setActionName,
    destination,
    actionName,
    // actionFeatureName,
    privateAsset,
    setPrivateAsset,
    setTotalAsset,
    setIssueData,
    setSituationCard,
    setWinnerID,
  } = useStore();

  const requestBody = {
    destination: destination,
    salary: salary,
    cardId: cardId,
  };

    useEffect(() => {
      if (session) {
        const handleReceivedMessage = (event: SignalEvent) => {
          if (event.type == "signal:playerToRoll") {
            console.log("잘됩니다!!!!!!!!!!!!!");
          }
          if (event.type == "playerToRoll") {
            console.log("잘됩니다!!!!!!!!!!!!!");
          }
          if (event.type == "signal:gangsin_gogo") {
            console.log(
              " // 0번 : " +
                sessionStorage.getItem("player0") +
                " // 1번 : " +
                sessionStorage.getItem("player1") +
                " // 2번 : " +
                sessionStorage.getItem("player2") +
                " // 3번 : " +
                sessionStorage.getItem("player3")
            );
          }
        };
        session.on("signal", handleReceivedMessage);

        return () => {
          session.off("signal", handleReceivedMessage);
        };
      }
    }, [session]);

  const actionPost = useMutation(async () => {
    const response = await fetch(`${baseUrl}/game/${actionName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return response.json();
  });
  const handleAction = async () => {
    try {
      const data = await actionPost.mutateAsync();
      setPrivateAsset(data);
    } catch (error) {
      console.error("Failed to enter room:", error);
    }
  };
  const situationdata = {};
  const situationPost = useMutation(async () => {
    const response = await fetch(`${baseUrl}/game/situation/${situationId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(situationdata),
    });
    return response.json();
  });
  const handleSituation = async () => {
    try {
      const situationSgnalOptions = {
        data: JSON.stringify({ situation: turn }),
        type: "situation",
      };
      session
        ?.signal(situationSgnalOptions)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      const data = await situationPost.mutateAsync();
      setTotalAsset(data);
    } catch (error) {
      console.error("Failed to enter room:", error);
    }
  };

  useEffect(() => {
    if (actionName) {
      console.log(cardId);
      const ActionSignalOptions = {
        data: JSON.stringify({ action: actionName }),
        type: "action",
      };
      session
        ?.signal(ActionSignalOptions)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });

      handleAction();
      setActionName("");
      setSalary(false);
      setTurn((prev) => prev + 1);
      if (turn != 0 && (turn + 1) % 4 == 0) {
        openSituation();
      }
    }
  }, [actionName]);

  useEffect(() => {
    if (totalAsset && privateAsset) {
      if (
        totalAsset.myProperty.cash - totalAsset?.myProperty.loan >=
        1000000000
      ) {
        openEnd();
        setWinnerID(totalAsset.myProperty.memberId);
      } else if (privateAsset.cash - privateAsset.loan >= 1000000000) {
        openEnd();
        setWinnerID(privateAsset.memberId);
      }
      totalAsset.propertyList.forEach((property) => {
        if (property.cash - property.loan >= 1000000000) {
          openEnd();
          setWinnerID(property.memberId);
        }
      });
    }
  }, [totalAsset, privateAsset]);
  // 재테크 카드 받아오기
  const fetchFintechData = async () => {
    const res = await fetch(`${baseUrl}/game/fintech`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  // 이슈 카드 받아오기
  const fetchIssueData = async () => {
    const res = await fetch(`${baseUrl}/game/issue`);
    return res.json();
  };

  // 전체 재산 목록 받아오기
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
  // 상황 카드 받아오기
  const { roomId } = useParams();
  const fetchSituationData = async () => {
    const res = await fetch(`${baseUrl}/game/${roomId}`);
    const data = await res.json(); // 받아온 데이터
    return data;
  };

  // 보유한 재산 중 하나 팔기
  const sellPost = useMutation(async () => {
    const response = await fetch(`${baseUrl}/game/sale/${fintechId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return response.json();
  });

  const handleSellAction = async () => {
    try {
      const sellsignalOptions = {
        data: JSON.stringify({ sell: turn }),
        type: "sell",
      };
      session
        ?.signal(sellsignalOptions)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      const data = await sellPost.mutateAsync();
      setPrivateAsset(data);
    } catch (error) {
      console.error("Failed to enter room:", error);
    }
  };
  useEffect(() => {
    if (fintechId) {
      handleSellAction();
    }
  }, [fintechId]);

  useEffect(() => {
    if (situationId) {
      handleSituation();
    }
  }, [situationId]);

  useEffect(() => {
    setTimeout(() => {
      const fetchAndSetTotalAssetData = async () => {
        const totalAssetData = await fetchtotalAssetData();
        setTotalAsset(totalAssetData);
      };
      const fetchAndSetSituationData = async () => {
        const situationCardData = await fetchSituationData();
        setSituationCard(situationCardData);
      };
      setTimeout(() => {
        fetchAndSetTotalAssetData();
        fetchAndSetSituationData();
      }, 0);
    }, 3000);
  }, []);

  // 주사위 던질때 마다 캐릭터, 맵 위치 변경
  useEffect(() => {
    if (diceScore != 0) {
      let toAdd = 0;
      // 캐릭터 위치 한 칸씩 갱신
      const intervalId = setInterval(() => {
        setLocation((prev) => {
          const updatedLocation = [...prev];
          updatedLocation[playerToRoll] += 1;
          return updatedLocation;
        });
        toAdd++;
        if (toAdd > diceScore - 1) {
          clearInterval(intervalId);
        }
      }, 10);

      // 마지막 도착 지점
      // location은 한 칸씩 증가해서 modal이 열려버림
      setModalLoca((prev) => {
        const updatedModalLoca = [...prev];
        updatedModalLoca[playerToRoll] =
          (updatedModalLoca[playerToRoll] + diceScore) % 24;
        return updatedModalLoca;
      });

      setTotalLocation((prev) => {
        const updateTotalLocation = [...prev];
        updateTotalLocation[playerToRoll] =
          (updateTotalLocation[playerToRoll] + diceScore) % 24;
        return updateTotalLocation;
      });

      ///////////////////////////////////////
      const sendModalLoca = (modalLoca[playerToRoll] + diceScore) % 24;
      const playersignalOptions = {
        data: JSON.stringify({
          playerToRoll: playerToRoll,
          modalLoca: sendModalLoca,
        }),
        type: "playerToRoll",
      };
      session
        ?.signal(playersignalOptions)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [diceScore]);

  // 도착지 기준으로 모달 열기
  // 여기서 도착지 기준으로 POST 요청 보내기

  useEffect(() => {
    setDestination(modalLoca[playerToRoll]);
    if (
      totalLocation[playerToRoll] > 0 &&
      location[playerToRoll] % 24 >= 11 &&
      location[playerToRoll] % 24 <= 23 &&
      totalLocation[playerToRoll] <= 13
    ) {
      setTimeout(() => {
        setTimeout(() => {
          openStart();
        }, 0);
      }, 3000);
    } else if (
      location[playerToRoll] != 0 &&
      totalLocation[playerToRoll] == 0
    ) {
      setTimeout(() => {
        setTimeout(() => {
          openStart2();
        }, 0);
      }, 3000);
    }
    if (
      modalLoca[playerToRoll] == 2 ||
      modalLoca[playerToRoll] == 4 ||
      modalLoca[playerToRoll] == 7 ||
      modalLoca[playerToRoll] == 10 ||
      modalLoca[playerToRoll] == 13 ||
      modalLoca[playerToRoll] == 15 ||
      modalLoca[playerToRoll] == 19 ||
      modalLoca[playerToRoll] == 21
    ) {
      setTimeout(() => {
        const fetchAndSetIssuehData = async () => {
          const issueCardData = await fetchIssueData();
          setIssueData(issueCardData);
        };
        setTimeout(() => {
          fetchAndSetIssuehData();
          openIssue();
        }, 0);
      }, 3000);
    }
    if (
      modalLoca[playerToRoll] == 1 ||
      modalLoca[playerToRoll] == 3 ||
      modalLoca[playerToRoll] == 5 ||
      modalLoca[playerToRoll] == 9 ||
      modalLoca[playerToRoll] == 11 ||
      modalLoca[playerToRoll] == 14 ||
      modalLoca[playerToRoll] == 17 ||
      modalLoca[playerToRoll] == 20 ||
      modalLoca[playerToRoll] == 22
    ) {
      setTimeout(() => {
        const fetchAndSetFintechData = async () => {
          const fintechCardData = await fetchFintechData();
          setFintechData(fintechCardData);
        };
        setTimeout(() => {
          fetchAndSetFintechData();
          openAssets();
        }, 0);
      }, 3000);
    }
    if (modalLoca[playerToRoll] == 12 || modalLoca[playerToRoll] == 23) {
      setTimeout(() => {
        setTimeout(() => {
          openDouble();
        }, 0);
      }, 3000);
    }
    if (modalLoca[playerToRoll] == 8 || modalLoca[playerToRoll] == 18) {
      setTimeout(() => {
        setTimeout(() => {
          openHalf();
        }, 0);
      }, 3000);
    }
  }, [modalLoca]);

  const buttonStyle = css`
    position: absolute;
    top: 76%;
    left: 70%;
    transform: translate(-50%, -50%);
    border: solid white 4px;
    background-color: #bbe4ec;
    width: 9vw;
    height: 5.5vh;
    cursor: pointer;
    border-radius: 10px;
    font-size: 1.1vw;
    color: #5c5c5c;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const buttonStyle2 = css`
    position: absolute;
    top: 76%;
    left: 60.5%;
    transform: translate(-50%, -50%);
    border: solid white 4px;
    background-color: #bbe4ec;
    width: 9vw;
    height: 5.5vh;
    cursor: pointer;
    border-radius: 10px;
    font-size: 1.1vw;
    color: #5c5c5c;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const sellPlayerAsset = css`
    position: absolute;
    background-color: white;
    top: 54%;
    left: 84%;
    width: 10%;
    height: 4%;
    margin-bottom: 10px;
    border-radius: 30px;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1vw;
    font-weight: bold;
    border: solid black 1.3px;
  `;
  const user = localStorage.getItem("user_name");
  return (
    <>
      <Player session={session} />
      <Canvas
        style={{
          height: "100vh",
          width: "85vw",
        }}
      >
        <ambientLight intensity={1} />
        <OrthographicCamera makeDefault zoom={36} position={[4, 4, 4]} />
        <OrbitControls enableRotate={false} enableZoom={false} />
        {sessionStorage.getItem("player0") &&
        sessionStorage.getItem("player1") &&
        sessionStorage.getItem("player2") &&
        sessionStorage.getItem("player3") ? (
          <>
            {users[playerToRoll].nickname == user ? (
              <>
                {playerToRoll == 1 && (
                  <>
                    <Dog
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player0")}
                      opacity={1}
                    />

                    <Board
                      diceScore={diceScore}
                    />

                    <Camel
                      diceScore={0}
                      location={sessionStorage.getItem("player3")}
                      opacity={0.5}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.5}
                    />
                    <Bear
                      diceScore={0}
                      location={sessionStorage.getItem("player2")}
                      opacity={0.5}
                    />
                  </>
                )}
                {playerToRoll == 2 && (
                  <>
                    <Chicken
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player1")}
                      opacity={1}
                    />
                    <Board
                      diceScore={diceScore}
                    
                    />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.5}
                    />
                    <Bear
                      diceScore={0}
                      location={sessionStorage.getItem("player2")}
                      opacity={0.5}
                    />
                    <Camel
                      diceScore={0}
                      location={sessionStorage.getItem("player3")}
                      opacity={0.5}
                    />
                  </>
                )}
                {playerToRoll == 3 && (
                  <>
                    <Bear
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player2")}
                      opacity={1}
                    />
                    <Board diceScore={diceScore} 
                    />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.5}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.5}
                    />
                    <Camel
                      diceScore={0}
                      location={sessionStorage.getItem("player3")}
                      opacity={0.5}
                    />
                  </>
                )}
                {playerToRoll == 0 && (
                  <>
                    <Camel
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player3")}
                      opacity={1}
                    />
                    <Board diceScore={diceScore}  />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.3}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.3}
                    />
                    <Bear
                      diceScore={0}
                      location={sessionStorage.getItem("player2")}
                      opacity={0.3}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {playerToRoll == 1 ? (
                  <>
                    <Dog
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.5}
                    />
                    <Board diceScore={diceScore}  />
                    <Camel
                      diceScore={0}
                      location={sessionStorage.getItem("player3")}
                      opacity={0.5}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.5}
                    />
                    <Bear
                      diceScore={0}
                      location={sessionStorage.getItem("player2")}
                      opacity={0.5}
                    />
                  </>
                ) : playerToRoll == 2 ? (
                  <>
                    <Chicken
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.5}
                    />
                    <Board diceScore={diceScore} />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.5}
                    />
                    <Bear diceScore={0} location={sessionStorage.getItem("player2")} opacity={0.5} />
                    <Camel diceScore={0} location={sessionStorage.getItem("player3")} opacity={0.5} />
                  </>
                ) : playerToRoll == 3 ? (
                  <>
                    <Bear
                      diceScore={diceScore}
                      location={sessionStorage.getItem("player2")}
                      opacity={1}
                    />
                    <Board diceScore={diceScore}  />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.5}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.5}
                    />
                    <Camel diceScore={0} location={sessionStorage.getItem("player3")} opacity={0.5} />
                  </>
                ) : (
                  <>
                    <Camel
                      diceScore={diceScore}
                      location={characterLocation}
                      opacity={0.5}
                    />
                    <Board diceScore={diceScore}  />
                    <Dog
                      diceScore={0}
                      location={sessionStorage.getItem("player0")}
                      opacity={0.3}
                    />
                    <Chicken
                      diceScore={0}
                      location={sessionStorage.getItem("player1")}
                      opacity={0.3}
                    />
                    <Bear
                      diceScore={0}
                      location={sessionStorage.getItem("player2")}
                      opacity={0.3}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : null}

        <Environment preset="sunset" />
        <ContactShadows
          position={[-0, 4, -1]}
          opacity={1}
          scale={500}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
      </Canvas>
      {totalAsset?.myProperty?.fintechList ? (
        <>
          <div css={sellPlayerAsset} onClick={openSellAssets}>
            재테크 팔기
          </div>
        </>
      ) : null}

      <button
        css={buttonStyle}
        onClick={() => {
          openLoan();
          closeRepayment();
        }}
      >
        대출 받기
      </button>
      <button
        css={buttonStyle2}
        onClick={() => {
          openRepayment();
          closeLoan();
        }}
      >
        대출금 상환
      </button>

      <Dice
        onDataDice={handleDataDice}
        users={users}
        session={session}
        //
      />

      {isOpenRepayment ? (
        <Repayment close={closeRepayment} session={session} />
      ) : null}
      {isOpenLoan ? <Loan close={closeLoan} /> : null}
      {isOpenSituation ? (
        <Situation close={closeSituation} turn={Math.floor(turn / 4)} />
      ) : null}
      {isOpenAssets ? <Asset close={closeAssets} /> : null}
      {isOpenIssue ? <Issue close={closeIssue} /> : null}
      {isOpenSellAssets ? <SellAsset close={closeSellAssets} /> : null}
      {isOpenDouble ? <Multi close={closeDouble} /> : null}
      {isOpenHalf ? <Half close={closeHalf} /> : null}
      {isOpenStart ? <Start close={closeStart} /> : null}
      {isOpenStart2 ? <Start2 close={closeStart2} /> : null}
      {isOpenEnd ? <EndGame close={closeEnd} /> : null}

      {/* <Chat session={session} /> */}
    </>
  );
};
export default Maps;
