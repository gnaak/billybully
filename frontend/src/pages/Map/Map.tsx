import { useEffect, useState } from "react";
import store from "../../store/index";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  OrthographicCamera,
} from "@react-three/drei";
import Player from "../../components/Player";
import Board from "../../components/Board";
import Dice from "../../components/Dice";
import Dog from "../../components/characters/Dog";
import Chicken from "../../components/characters/Chicken";
import Bear from "../../components/characters/Bear";
import Camel from "../../components/characters/Camel";
import Situation from "../../components/Card/Situation";
import useModal from "../../hooks/useModal";
import Asset from "../../components/Card/Asset";

const Map = () => {
  const [isOpenSituation, openSituation, closeSituation] = useModal();
  const [isOpenAssets, openAssets, closeAssets] = useModal();
  const [location, setLocation] = useState<number[]>([0, 0, 0, 0]);
  const [playerToRoll, setPlayerToRoll] = useState<number>(0);
  const [diceScore, setTotalScore] = useState<number>(0);
  const [modalLoca, setModalLoca] = useState<number[]>([0, 0, 0, 0]);
  const handleDataDice = (score: number) => {
    setTotalScore(score);
  };

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

      // 다음 턴
      const nextPlayerToRoll = (playerToRoll + 1) % 4;

      // 마지막 도착 지점
      // location은 한 칸씩 증가해서 modal이 열려버림
      setModalLoca((prev) => {
        const updatedModalLoca = [...prev];
        updatedModalLoca[playerToRoll] =
          (updatedModalLoca[playerToRoll] + diceScore) % 24;
        return updatedModalLoca;
      });
      setTimeout(() => {
        setPlayerToRoll(nextPlayerToRoll);
      }, 0);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [diceScore]);

  // 도착지 기준으로 모달 열기
  useEffect(() => {
    if (modalLoca[playerToRoll] == 4) {
      setTimeout(() => {
        openSituation();
      }, 3000);
    }
    if (modalLoca[playerToRoll] >= 2) {
      setTimeout(() => {
        openAssets();
      }, 3000);
    }
  }, [modalLoca]);


  return (
    <>
      <Player />
      <Canvas
        style={{
          height: "100vh",
          width: "85vw",
        }}
      >
        <ambientLight intensity={1} />
        <OrthographicCamera makeDefault zoom={32} position={[4, 4, 4]} />
        <OrbitControls enableRotate={false} enableZoom={false} />
        {playerToRoll == 1 && (
          <>
            <Dog diceScore={diceScore} location={location[0]} opacity={1} />
            <Board diceScore={diceScore} location={location[0]} />
            <Camel diceScore={0} location={location[3]} opacity={0.5} />
            <Chicken diceScore={0} location={location[1]} opacity={0.5} />
            <Bear diceScore={0} location={location[2]} opacity={0.5} />
          </>
        )}
        {playerToRoll == 2 && (
          <>
            <Chicken diceScore={diceScore} location={location[1]} opacity={1} />
            <Board diceScore={diceScore} location={location[1]} />
            <Dog diceScore={0} location={location[0]} opacity={0.5} />
            <Bear diceScore={0} location={location[2]} opacity={0.5} />
            <Camel diceScore={0} location={location[3]} opacity={0.5} />
          </>
        )}
        {playerToRoll == 3 && (
          <>
            <Bear diceScore={diceScore} location={location[2]} opacity={1} />
            <Board diceScore={diceScore} location={location[2]} />
            <Dog diceScore={0} location={location[0]} opacity={0.5} />
            <Chicken diceScore={0} location={location[1]} opacity={0.5} />
            <Camel diceScore={0} location={location[3]} opacity={0.5} />
          </>
        )}
        {playerToRoll == 0 && (
          <>
            <Camel diceScore={diceScore} location={location[3]} opacity={1} />
            <Board diceScore={diceScore} location={location[3]} />
            <Dog diceScore={0} location={location[0]} opacity={0.3} />
            <Chicken diceScore={0} location={location[1]} opacity={0.3} />
            <Bear diceScore={0} location={location[2]} opacity={0.3} />
          </>
        )}
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
      <Dice onDataDice={handleDataDice} />

      {isOpenSituation ? <Situation close={closeSituation} /> : null}
      {isOpenAssets ? (
        <Asset
          close={closeAssets}
        />
      ) : null}
    </>
  );
};
export default Map;
