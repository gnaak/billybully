/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import BoardProps from "@/types/BoardProps";

const Board: React.FC<BoardProps> = ({ diceScore }) => {
  const mapPath = "/untitled.gltf";
  const map = useLoader(GLTFLoader, mapPath);
  const position = [-5, -14, -3];
  const rotation = [0, 0, 0];
  const scale = [1.5, 1.5, 1.5];

  const mixer: THREE.AnimationMixer = new THREE.AnimationMixer(map.scene);
  const location = sessionStorage.getItem("player1")
  const PlayAnimation = (mapIdx: number) => {
    if (diceScore != 0) {
      const animations: THREE.AnimationClip[] = map.animations;
      const animation = animations[mapIdx];
      const action = mixer.clipAction(animation);
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

      animate();
    }
  };
useEffect(() => {
  if (diceScore !== 0 && location !== null) {
    let toAni = Math.abs(parseInt(location) - diceScore) + 1;
    const intervalId = setInterval(() => {
      const mapIdx = toAni % 24;
      PlayAnimation(mapIdx);
      toAni++;
      if (toAni > parseInt(location)) {
        clearInterval(intervalId);
      }
    }, 250);
    return () => {
      clearInterval(intervalId);
    };
  }
}, [diceScore, location]);

  const clock = new THREE.Clock();

  const animate = () => {
    if (mixer) {
      const delta = clock.getDelta();
      mixer.update(delta);
      requestAnimationFrame(animate);
    }
  };

  return (
    <Suspense fallback={null}>
      <primitive
        object={map.scene}
        position={position}
        rotation={rotation}
        scale={scale}
      ></primitive>
    </Suspense>
  );
};
export default Board;
