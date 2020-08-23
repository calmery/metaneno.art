import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import { Mesh, Geometry, BufferGeometry, Material, Vector3 } from "three";

type PlayerProps = {
  onMove: (x: number, y: number, z: number) => void;
};

export const Player: React.FC<PlayerProps> = ({ onMove }) => {
  const ref = useRef<
    ReactThreeFiber.Object3DNode<
      Mesh<Geometry | BufferGeometry, Material | Material[]>,
      typeof Mesh
    >
  >();

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  const handleOnKeyDown = useCallback(({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) setUp(true);
    if (keyCode === 83 || keyCode === 40) setDown(true);
    if (keyCode === 65 || keyCode === 37) setLeft(true);
    if (keyCode === 68 || keyCode === 39) setRight(true);
  }, []);

  const handleOnKeyUp = useCallback(({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) setUp(false);
    if (keyCode === 83 || keyCode === 40) setDown(false);
    if (keyCode === 65 || keyCode === 37) setLeft(false);
    if (keyCode === 68 || keyCode === 39) setRight(false);
  }, []);

  useEffect(() => {
    addEventListener("keydown", handleOnKeyDown);
    addEventListener("keyup", handleOnKeyUp);

    return () => {
      removeEventListener("keydown", handleOnKeyDown);
      removeEventListener("keyup", handleOnKeyUp);
    };
  }, []);

  useFrame((state) => {
    const position = ref.current!.position as Vector3;

    let nextX = 0;
    let nextZ = 0;

    if (up || left) {
      nextX += 0.1;
    }

    if (down || right) {
      nextX -= 0.1;
    }

    if (up || right) {
      nextZ += 0.1;
    }

    if (down || left) {
      nextZ -= 0.1;
    }

    position.x += nextX;
    position.z += nextZ;

    state.camera.position.x = position.x - 2;
    state.camera.position.y = position.y + 4;
    state.camera.position.z = position.z - 2;
    state.camera.lookAt(position);
    state.camera.updateProjectionMatrix();

    if (nextX || nextZ) {
      onMove(position.x, position.y, position.z);
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshToonMaterial attach="material" color={"#000"} />
    </mesh>
  );
};
