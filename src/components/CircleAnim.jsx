import React, { useRef, useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getColorFromRange } from "../utils";

function Circle({
	themes,
	position,
	rotation,
	args,
	main,
	init,
	transitionOngoing,
	N,
	idx0,
	idx1,
	idx,
}) {
	const [themeIdx, setThemeIdx] = useState(0);
	const [nextThemeIdx, setNextThemeIdx] = useState(1);

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
			setThemeIdx(idx0);
			setNextThemeIdx(idx1);
			// currentColors.main = getColorFromRange(
			// 	themes[idx0].color,
			// 	themes[idx0].colorEnd,
			// 	idx / 2 - 1,
			// 	Math.ceil(N / 2),
			// 	12
			// );
			// currentColors.sub = getColorFromRange(
			// 	themes[idx0].secondaryColor,
			// 	themes[idx0].secondaryColorEnd,
			// 	~~(idx / 2),
			// 	Math.floor(N / 2),
			// 	12
			// );
			// currentColors.transitionMain = getColorFromRange(
			// 	themes[idx1].color,
			// 	themes[idx1].colorEnd,
			// 	idx / 2 - 1,
			// 	Math.ceil(N / 2),
			// 	12
			// );
			// currentColors.transitionSub = getColorFromRange(
			// 	themes[idx1].secondaryColor,
			// 	themes[idx1].secondaryColorEnd,
			// 	~~(idx / 2),
			// 	Math.floor(N / 2),
			// 	12
			// );

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
		// mesh.current.position.x =
		// 	position[0] === 0
		// 		? 0
		// 		: position[0] > 0
		// 		? 0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2))
		// 		: -0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2));
		// mesh.current.position.y =
		// 	position[1] === 0
		// 		? 0
		// 		: position[1] > 0
		// 		? 0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2))
		// 		: -0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2));
		// meshTransition.current.position.x =
		// 	position[0] === 0
		// 		? 0
		// 		: position[0] > 0
		// 		? 0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2)) +
		// 		  0.0015
		// 		: -0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2)) -
		// 		  0.0015;
		// meshTransition.current.position.y =
		// 	position[1] === 0
		// 		? 0
		// 		: position[1] > 0
		// 		? 0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2)) +
		// 		  0.0015
		// 		: -0.001 * (N * 4 - Math.floor(mesh.current.scale.x * N * 2)) -
		// 		  0.0015;

		mesh.current.scale.y = mesh.current.scale.x += 0.001;
		if (!transitionEnded) {
			meshTransition.current.scale.y =
				meshTransition.current.scale.x += 0.0018;
		} else if (mesh.current.scale.y > WIDTH / N) {
			meshTransition.current.scale.y =
				meshTransition.current.scale.x += 0.001;
		}
		if (meshTransition.current.scale.y > mesh.current.scale.y) {
			// if(idx === 10) console.log(idx0)
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
	// useEffect(() => {
	// 	// setCurrentColors({
	// 	// 	main: getColorFromRange(
	// 	// 		themes[themeIdx].color,
	// 	// 		themes[themeIdx].colorEnd,
	// 	// 		idx / 2 - 1,
	// 	// 		Math.ceil(N / 2),
	// 	// 		12
	// 	// 	),
	// 	// 	sub: getColorFromRange(
	// 	// 		themes[themeIdx].secondaryColor,
	// 	// 		themes[themeIdx].secondaryColorEnd,
	// 	// 		~~(idx / 2),
	// 	// 		Math.floor(N / 2),
	// 	// 		12
	// 	// 	),
	// 	// 	transitionMain: getColorFromRange(
	// 	// 		themes[nextThemeIdx].color,
	// 	// 		themes[nextThemeIdx].colorEnd,
	// 	// 		idx / 2 - 1,
	// 	// 		Math.ceil(N / 2),
	// 	// 		12
	// 	// 	),
	// 	// 	transitionSub: getColorFromRange(
	// 	// 		themes[nextThemeIdx].secondaryColor,
	// 	// 		themes[nextThemeIdx].secondaryColorEnd,
	// 	// 		~~(idx / 2),
	// 	// 		Math.floor(N / 2),
	// 	// 		12
	// 	// 	),
	// 	// });
	// 	currentColors.main = getColorFromRange(
	// 		themes[themeIdx].color,
	// 		themes[themeIdx].colorEnd,
	// 		idx / 2 - 1,
	// 		Math.ceil(N / 2),
	// 		12
	// 	);
	// 	currentColors.sub = getColorFromRange(
	// 		themes[themeIdx].secondaryColor,
	// 		themes[themeIdx].secondaryColorEnd,
	// 		~~(idx / 2),
	// 		Math.floor(N / 2),
	// 		12
	// 	);
	// 	currentColors.transitionMain = getColorFromRange(
	// 		themes[nextThemeIdx].color,
	// 		themes[nextThemeIdx].colorEnd,
	// 		idx / 2 - 1,
	// 		Math.ceil(N / 2),
	// 		12
	// 	);
	// 	currentColors.transitionSub = getColorFromRange(
	// 		themes[nextThemeIdx].secondaryColor,
	// 		themes[nextThemeIdx].secondaryColorEnd,
	// 		~~(idx / 2),
	// 		Math.floor(N / 2),
	// 		12
	// 	);
	// }, [themeIdx]);

	return (
		<>
			<mesh
				receiveShadow
				position={[0, 0, 0]}
				// position={position}
				ref={mesh}
				rotation={rotation}
			>
				<circleBufferGeometry args={args} />
				{/* <meshLambertMaterial
					attach="material"
					color={
						main
							? themes[themeIdx].color
							: themes[themeIdx].secondaryColor
					}
					factor={0.6}
				/> */}
				{main ? (
					currentColors.material ? (
						<meshNormalMaterial />
					) : (
						<meshLambertMaterial
							attach="material"
							// color={getColorFromRange(
							// 	themes[themeIdx].color,
							// 	themes[themeIdx].colorEnd,
							// 	idx / 2 - 1,
							// 	Math.ceil(N / 2),
							// 	12
							// )}
							// color={themes[themeIdx].color}
							color={currentColors.main}
							// color={currentColors.main}
							factor={0.6}
						/>
					)
				) : (
					<meshLambertMaterial
						attach="material"
						// color={getColorFromRange(
						// 	themes[themeIdx].secondaryColor,
						// 	themes[themeIdx].secondaryColorEnd,
						// 	~~(idx / 2),
						// 	Math.floor(N / 2),
						// 	12
						// )}
						// color={themes[themeIdx].secondaryColor}
						color={currentColors.sub}
						// color={currentColors.sub}
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
				<circleBufferGeometry args={args} />
				{/* <meshLambertMaterial
					visible={!transitionEnded}
					attach="material"
					color={
						main
							? themes[nextThemeIdx].color
							: themes[nextThemeIdx].secondaryColor
					}
					factor={0.6}
				/> */}
				{main ? (
					currentColors.transitionMaterial ? (
						<meshNormalMaterial visible={!transitionEnded} />
					) : (
						// themes[nextThemeIdx].wallMaterial ? (
						// 	themes[nextThemeIdx].materialType === "normal" ? (
						// 		<meshNormalMaterial visible={!transitionEnded} />
						// 	) : (
						// 		<meshDistanceMaterial visible={!transitionEnded} />
						// 	)
						<meshLambertMaterial
							visible={!transitionEnded}
							attach="material"
							// color={getColorFromRange(
							// 	themes[nextThemeIdx].color,
							// 	themes[nextThemeIdx].colorEnd,
							// 	idx / 2 - 1,
							// 	Math.ceil(N / 2),
							// 	12
							// )}
							// color={themes[nextThemeIdx].color}
							color={currentColors.transitionMain}
							factor={0.6}
						/>
					)
				) : (
					<meshLambertMaterial
						visible={!transitionEnded}
						attach="material"
						// color={themes[nextThemeIdx].secondaryColor}
						// color={getColorFromRange(
						// 	themes[nextThemeIdx].secondaryColor,
						// 	themes[nextThemeIdx].secondaryColorEnd,
						// 	~~(idx / 2),
						// 	Math.floor(N / 2),
						// 	12
						// )}
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
}) {
	return (
		<>
			<Circle
				themes={themes}
				position={[0.001, 0, 0]}
				rotation={[0, Math.PI / 4, 0]}
				args={[5, 150]}
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
				args={[5, 150]}
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
				args={[5, 150]}
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
