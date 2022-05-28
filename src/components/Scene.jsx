import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";

import useTheme from "../themes";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import CirclesAnim from "./CircleAnim";
import Skull from "./Skull";
import Loading from "./Loading";

const CameraController = () => {
	const { camera, gl } = useThree();
	useEffect(() => {
		const controls = new OrbitControls(camera, gl.domElement);

		controls.minDistance = 3;
		controls.maxDistance = 20;
		return () => {
			controls.dispose();
		};
	}, [camera, gl]);
	return null;
};

function Box({ position, rotation, args }) {
	const mesh = useRef();

	return (
		<mesh position={position} ref={mesh} rotation={rotation}>
			<boxBufferGeometry attach="geometry" args={args} />
			<meshLambertMaterial
				attach="material"
				color="#5e8f7b"
				factor={0.6}
			/>
		</mesh>
	);
}

function Scene({ idx0, idx1, idx2, updateIdx, setLoaded, moveSkull }) {
	const [transitionOngoing, setTransitionOngoing] = useState(false);
	const [mainColor, setMainColor] = useState(true);
	const [transitionColor, setTransitionColor] = useState(true);

	const themes = useTheme();

	const WIDTH = 4;
	const N = 25 * WIDTH;
	let initials = [];
	for (let i = 0; i <= N; i++) {
		initials.push((WIDTH / N) * i - 1 / N, (WIDTH / N) * i);
	}
	let animation = [];
	for (let i = 1; i <= N; i++) {
		animation.push(
			<CirclesAnim
				themes={themes}
				key={i}
				idx={i}
				init={(WIDTH / N) * i}
				main={i % 2 === 0}
				mainColor={mainColor}
				transitionColor={transitionColor}
				initials={initials}
				transitionOngoing={transitionOngoing}
				N={N}
				idx0={idx0}
				idx1={idx1}
				idx2={idx2}
			/>
		);
	}
	return (
		// <Canvas
		// 	className="canvas"
		// 	shadows
		// 	camera={{ fov: 80, near: 0.1, far: 1000, position: [2, 2, 6] }}
		// >
		<>
			{/* <CameraController /> */}
			{/* <primitive object={new THREE.AxesHelper(10)} /> */}
			{/* <primitive object={new THREE.GridHelper(100, 200)} /> */}
			<ambientLight intensity={0.3} />

			<pointLight position={[15, 19, 27]} intensity={0.4} />
			<pointLight position={[-10, 0, -20]} intensity={0.5} />
			<pointLight position={[0, -10, 0]} intensity={0.4} />
			{/* <group>
				<Box
					position={[3.5, 3, 3.49]}
					rotation={[0, -Math.PI / 4, 0]}
					args={[10, 6, 0]}
				/>
				<Box
					position={[-3.5, 3, 3.49]}
					rotation={[0, Math.PI / 4, 0]}
					args={[10, 6, 0]}
				/>
				<Box
					position={[0, 0, 7]}
					rotation={[0, Math.PI / 4, 0]}
					args={[10, 0, 10]}
				/>
			</group> */}
			<React.Suspense fallback={<Loading setLoaded={setLoaded} />}>
				<group>{animation}</group>
				<Skull
					themes={themes}
					transitionOngoing={transitionOngoing}
					setTransitionOngoing={setTransitionOngoing}
					mainColor={mainColor}
					setMainColor={setMainColor}
					transitionColor={transitionColor}
					setTransitionColor={setTransitionColor}
					idx0={idx0}
					idx1={idx1}
					updateIdx={updateIdx}
					moveSkull={moveSkull}
				/>
			</React.Suspense>
			{/* </Canvas> */}
		</>
	);
}

export default Scene;
