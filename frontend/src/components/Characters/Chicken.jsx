import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const mapPosition = [
  [-3.2, -11, -1],
  [-6.8, -11, -1],
  [-10, -11, -1],
  [-13, -11, -1],
  [-16, -11, -1],
  [-19, -11, -1],
  [-22, -11, -1],
  [-22, -11, -5],
  [-22, -11, -8],
  [-22, -11, -11],
  [-22, -11, -14],
  [-22, -11, -17],
  [-22, -11, -20.5],
  [-19, -11, -20.5],
  [-16, -11, -20.5],
  [-13, -11, -20.5],
  [-10, -11, -20.5],
  [-6.8, -11, -20.5],
  [-3.2, -11, -20.5],
  [-3.2, -11, -17],
  [-3.2, -11, -14],
  [-3.2, -11, -11],
  [-3.2, -11, -8],
  [-3.2, -11, -5],
];

const Chicken = ({ diceScore, location, opacity }) => {
  const chickenPath = "/public/characters/Chicken.gltf";
  const chicken = useLoader(GLTFLoader, chickenPath);
  const [rotation, setRotation] = useState([0, Math.PI / 4, 0]);
  const [position, setPosition] = useState(mapPosition[location]);
  const scale = [0.5, 0.5, 0.5];
    chicken.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = opacity;
      }
    });
  useEffect(() => {
    if (diceScore !== 0) {
      let toGo = 0;

      const intervalId = setInterval(() => {
        // 위치 업데이트
        const mapIdx = (location - diceScore + toGo) % 24;
        setPosition(mapPosition[mapIdx]);
        // 회전 설정
        if (mapIdx <= 6) {
          setRotation([0, 3 * (Math.PI / 2), 0]);
        } else if (mapIdx > 6 && mapIdx <= 12) {
          setRotation([0, Math.PI, 0]);
        } else if (mapIdx > 12 && mapIdx <= 18) {
          setRotation([0, Math.PI / 2, 0]);
        } else if (mapIdx > 18 && mapIdx <= 24) {
          setRotation([0, -Math.PI / 4, 0]);
        }

        toGo++; 

        if (toGo > diceScore) {
          clearInterval(intervalId); // 이동 완료 시 인터벌 정리
          setRotation([0, Math.PI / 4, 0]); // 회전 초기화
        }
      }, 200);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [diceScore, location]);

  return (
    <Suspense>
      <primitive
        object={chicken.scene}
        position={position}
        rotation={rotation}
        scale={scale}
        opacity={opacity}
      ></primitive>
    </Suspense>
  );
};

export default Chicken;
