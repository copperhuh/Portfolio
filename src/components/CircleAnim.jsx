import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { getColorFromRange } from "../utils";

function Circle({
	themes,
	position,
	rotation,
	geometry,
	main,
	init,
	transitionOngoing,
	N,
	idx0,
	idx1,
	idx,
}) {
	const mesh = useRef();
	const meshTransition = useRef();
	const [transitionEnded, setTransitionEnded] = useState(true);

	useEffect(() => {
		if (transitionOngoing) {
			setTransitionEnded(false);
		}
	}, [transitionOngoing]);

	useEffect(() => {
		if (transitionEnded) {
			setCurrentColors({
				main: getColorFromRange(
					themes[idx0].color,
					themes[idx0].colorEnd,
					idx / 2 - 1,
					Math.ceil(N / 2),
					12
				),
				sub: getColorFromRange(
					themes[idx0].secondaryColor,
					themes[idx0].secondaryColorEnd,
					~~(idx / 2),
					Math.floor(N / 2),
					12
				),
				material: themes[idx0].wallMaterial,
				transitionMain: getColorFromRange(
					themes[idx1].color,
					themes[idx1].colorEnd,
					idx / 2 - 1,
					Math.ceil(N / 2),
					12
				),
				transitionSub: getColorFromRange(
					themes[idx1].secondaryColor,
					themes[idx1].secondaryColorEnd,
					~~(idx / 2),
					Math.floor(N / 2),
					12
				),
				transitionMaterial: themes[idx1].wallMaterial,
			});
		}
	}, [transitionEnded]);

	const WIDTH = 4;
	useEffect(() => {
		if (transitionEnded) {
			if (mesh.current.scale.y > WIDTH / N) {
				meshTransition.current.scale.y =
					meshTransition.current.scale.x =
						meshTransition.current.scale.y - WIDTH / N;
			} else {
				meshTransition.current.scale.y =
					meshTransition.current.scale.x = -0.01;
			}
		}
	}, [transitionEnded]);

	useEffect(() => {
		mesh.current.scale.y = mesh.current.scale.x = init;
		if (mesh.current.scale.y > WIDTH / N) {
			meshTransition.current.scale.y = meshTransition.current.scale.x =
				init - WIDTH / N;
		} else {
			meshTransition.current.scale.y = meshTransition.current.scale.x =
				-0.01;
		}
	}, []);

	useFrame(() => {
		if (mesh.current.scale.y > WIDTH) {
			mesh.current.scale.y = mesh.current.scale.x = 0.01;
			meshTransition.current.scale.y = meshTransition.current.scale.x =
				-0.01;
		}

		mesh.current.position.x =
			position[0] === 0
				? 0
				: position[0] > 0
				? -0.001 * Math.floor(mesh.current.scale.x * N * 2)
				: 0.001 * Math.floor(mesh.current.scale.x * N * 2);
		mesh.current.position.y =
			position[1] === 0
				? 0
				: position[1] > 0
				? -0.001 * Math.floor(mesh.current.scale.x * N * 2)
				: 0.001 * Math.floor(mesh.current.scale.x * N * 2);
		meshTransition.current.position.x =
			position[0] === 0
				? 0
				: position[0] > 0
				? -0.001 * Math.floor(mesh.current.scale.x * N * 2) + 0.0015
				: 0.001 * Math.floor(mesh.current.scale.x * N * 2) - 0.0015;
		meshTransition.current.position.y =
			position[1] === 0
				? 0
				: position[1] > 0
				? -0.001 * Math.floor(mesh.current.scale.x * N * 2) + 0.0015
				: 0.001 * Math.floor(mesh.current.scale.x * N * 2) - 0.0015;

		mesh.current.scale.y = mesh.current.scale.x += 0.001;
		if (!transitionEnded) {
			meshTransition.current.scale.y =
				meshTransition.current.scale.x += 0.0018;
		} else if (mesh.current.scale.y > WIDTH / N) {
			meshTransition.current.scale.y =
				meshTransition.current.scale.x += 0.001;
		}
		if (meshTransition.current.scale.y > mesh.current.scale.y) {
			setCurrentColors({
				main: getColorFromRange(
					themes[idx0].color,
					themes[idx0].colorEnd,
					idx / 2 - 1,
					Math.ceil(N / 2),
					12
				),
				sub: getColorFromRange(
					themes[idx0].secondaryColor,
					themes[idx0].secondaryColorEnd,
					~~(idx / 2),
					Math.floor(N / 2),
					12
				),
				material: themes[idx0].wallMaterial,
				transitionMain: getColorFromRange(
					themes[idx1].color,
					themes[idx1].colorEnd,
					idx / 2 - 1,
					Math.ceil(N / 2),
					12
				),
				transitionSub: getColorFromRange(
					themes[idx1].secondaryColor,
					themes[idx1].secondaryColorEnd,
					~~(idx / 2),
					Math.floor(N / 2),
					12
				),
				transitionMaterial: themes[idx1].wallMaterial,
			});
			setTransitionEnded(true);
		}
	});

	const [currentColors, setCurrentColors] = useState({
		main: "#ffffff",
		sub: "#ffffff",
		transitionMain: "#ffffff",
		transitionSub: "#ffffff",
	});

	return (
		<>
			<mesh
				receiveShadow
				position={[0, 0, 0]}
				ref={mesh}
				rotation={rotation}
			>
				{geometry}
				{main ? (
					currentColors.material ? (
						<meshNormalMaterial />
					) : (
						<meshLambertMaterial
							attach="material"
							color={currentColors.main}
							factor={0.6}
						/>
					)
				) : (
					<meshLambertMaterial
						attach="material"
						color={currentColors.sub}
						factor={0.6}
					/>
				)}
			</mesh>
			<mesh
				receiveShadow
				position={[0, 0, 0]}
				ref={meshTransition}
				rotation={rotation}
			>
				{geometry}
				{main ? (
					currentColors.transitionMaterial ? (
						<meshNormalMaterial visible={!transitionEnded} />
					) : (
						<meshLambertMaterial
							visible={!transitionEnded}
							attach="material"
							color={currentColors.transitionMain}
							factor={0.6}
						/>
					)
				) : (
					<meshLambertMaterial
						visible={!transitionEnded}
						attach="material"
						color={currentColors.transitionSub}
						factor={0.6}
					/>
				)}
			</mesh>
		</>
	);
}

export default function CirclesAnim({
	themes,
	init,
	main,
	initials,
	transitionOngoing,
	N = { N },
	mainColor,
	transitionColor,
	idx0,
	idx1,
	idx,
	geometry,
}) {
	return (
		<>
			<Circle
				themes={themes}
				position={[0.001, 0, 0]}
				rotation={[0, Math.PI / 4, 0]}
				geometry={geometry}
				main={main}
				init={init}
				initials={initials}
				transitionOngoing={transitionOngoing}
				mainColor={mainColor}
				transitionColor={transitionColor}
				N={N}
				idx0={idx0}
				idx1={idx1}
				idx={idx}
			/>
			<Circle
				themes={themes}
				position={[-0.001, 0, 0]}
				rotation={[0, (Math.PI * 7) / 4, 0]}
				geometry={geometry}
				main={main}
				init={init}
				initials={initials}
				transitionOngoing={transitionOngoing}
				mainColor={mainColor}
				transitionColor={transitionColor}
				N={N}
				idx0={idx0}
				idx1={idx1}
				idx={idx}
			/>
			<Circle
				themes={themes}
				position={[0, 0.001, 0]}
				rotation={[(Math.PI * 3) / 2, 0, 0]}
				geometry={geometry}
				main={main}
				init={init}
				initials={initials}
				transitionOngoing={transitionOngoing}
				mainColor={mainColor}
				transitionColor={transitionColor}
				N={N}
				idx0={idx0}
				idx1={idx1}
				idx={idx}
			/>
		</>
	);
}
