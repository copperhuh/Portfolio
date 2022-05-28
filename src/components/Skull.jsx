import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { getColorFromRange } from "../utils";

const Skull = ({
	themes,
	transitionOngoing,
	setTransitionOngoing,
	mainColor,
	setMainColor,
	idx0,
	idx1,
	updateIdx,
	moveSkull,
}) => {
	const { x } = useSpring({
		loop: true,
		to: [{ x: (Math.PI * 4) / 10 }, { x: (Math.PI * 6) / 10 }],
		from: { x: (Math.PI * 5.5) / 10 },
		delay: 2,
		config: { mass: 100, tension: 300, friction: 0 },
		pause: !moveSkull,
	});

	const { y } = useSpring({
		loop: true,
		to: [{ y: (Math.PI * 9.5) / 10 }, { y: (Math.PI * 10.5) / 10 }],
		from: { y: (Math.PI * 10.5) / 10 },
		delay: 2,
		config: { mass: 100, tension: 250, friction: 0 },
		pause: !moveSkull,
	});

	const { z } = useSpring({
		loop: true,
		to: [{ z: (Math.PI * 8) / 4 }, { z: (Math.PI * 9.5) / 4 }],
		from: { z: (Math.PI * 9.5) / 4 },
		config: { mass: 100, tension: 100, friction: 0 },
		pause: !moveSkull,
	});

	const { v } = useSpring({
		loop: true,
		to: [{ v: 2 }, { v: 1.8 }],
		from: { v: 1.8 },
		config: { mass: 20, tension: 100, friction: 0 },
		pause: !moveSkull,
	});

	const [active, setActive] = useState(false);

	const { scale } = useSpring({
		scale: active ? [0.01, 0.01, 0.01] : [1.3, 1, 1.15],
		config: { mass: 1, tension: 160, friction: 20, damping: true },
	});

	const { scaleTransition } = useSpring({
		scaleTransition: active ? [1.6, 1.3, 1.45] : [0.01, 0.01, 0.01],
		config: { mass: 1, tension: 160, friction: 20, damping: true },
	});

	const { scaleBg } = useSpring({
		scaleBg: active ? [1.9, 1.5, 1.65] : [1.6, 1.2, 1.35],
		config: { mass: 1, tension: 160, friction: 20, damping: true },
	});

	// const [themeIdx, setThemeIdx] = useState(0);
	// const [nextThemeIdx, setNextThemeIdx] = useState(1);

	// const updateThemeIdx = () => {
	// 	if (nextThemeIdx === themes.length - 1) {
	// 		setThemeIdx(nextThemeIdx);
	// 		setNextThemeIdx(0);
	// 	} else {
	// 		setThemeIdx(nextThemeIdx);
	// 		setNextThemeIdx(nextThemeIdx + 1);
	// 	}
	// };

	const handleClick = (e) => {
		if (transitionOngoing || !moveSkull) return;
		e.stopPropagation();
		setTransitionOngoing(true);
		setActive(true);
		setTimeout(() => {
			setActive(false);
			setMainColor(false);
			setTimeout(() => {
				//
				// updateThemeIdx();
				updateIdx();
				//

				setMainColor(true);
				setTimeout(() => {
					setTransitionOngoing(false);
				}, 700);
			}, 150);
		}, 300);
	};
	//
	const [currentColorArrays, setCurrentColorArrays] = useState({
		main: [],
		sub: [],
	});
	useEffect(() => {
		const main = getColorFromRange(
			themes[idx0].color,
			themes[idx0].colorEnd,
			0,
			1000,
			1000,
			"all"
		);
		const sub = getColorFromRange(
			themes[idx1].color,
			themes[idx1].colorEnd,
			0,
			1000,
			1000,
			"all"
		);
		setCurrentColorArrays({
			main,
			sub,
		});
	}, [idx0]);
	const [colorCounter, setColorCounter] = useState(0);
	useFrame(() => {
		// console.log(
		// 	"aaaaaaaa",
		// 	colorCounter,
		// 	getColorFromRange(
		// 		"#3c98e8",
		// 		"#0969bd",
		// 		colorCounter,
		// 		Math.ceil(100 / 2),
		// 		Math.ceil(100 / 2)
		// 	)
		// );
		if (colorCounter >= 1000) {
			setColorCounter(0);
		} else {
			setColorCounter((prev) => prev + 1);
		}
	});
	//

	const { nodes } = useLoader(GLTFLoader, "./skull/scene.gltf");
	const skull = [];
	for (let i = 2; i <= 7; i++) {
		skull.push(
			<animated.mesh
				key={i}
				castShadow
				renderOrder={999}
				geometry={nodes[`Object_${i}`].geometry}
				position-x={0.5}
				position-y={v}
				position-z={2}
				rotation-x={x}
				rotation-y={y}
				rotation-z={z}
				scale={scale}
				///
			>
				{/* {mainColor ? currentMaterial : nextMaterial} */}
				{mainColor
					? themes[idx0].skullMaterial
						? themes[idx0].material
						: themes[idx0].material(
								currentColorArrays.main[colorCounter]
						  )
					: themes[idx1].skullMaterial
					? themes[idx1].material
					: themes[idx1].material(
							currentColorArrays.sub[colorCounter]
					  )}
				{/* {mainColor ? themes[idx0].material : themes[idx1].material} */}
			</animated.mesh>
		);
	}
	// console.log(themeIdx, nextThemeIdx);
	// console.log(skull[0]);
	const skullTransition = [];
	for (let i = 2; i <= 7; i++) {
		skullTransition.push(
			<animated.mesh
				key={i}
				castShadow
				renderOrder={999}
				geometry={nodes[`Object_${i}`].geometry}
				position-x={0.5}
				position-y={v}
				position-z={2}
				rotation-x={x}
				rotation-y={y}
				rotation-z={z}
				scale={scaleTransition}
			>
				{/* {nextMaterial} */}
				{/* {themes[idx1].material} */}
				{themes[idx1].skullMaterial
					? themes[idx1].material
					: themes[idx1].material(
							currentColorArrays.sub[colorCounter]
					  )}
			</animated.mesh>
		);
	}
	const skullBg = [];
	for (let i = 2; i <= 7; i++) {
		skullBg.push(
			<animated.mesh
				key={i}
				renderOrder={998}
				castShadow
				geometry={nodes[`Object_${i}`].geometry}
				position-x={0.5}
				position-y={v}
				position-z={2}
				rotation-x={x}
				rotation-y={y}
				rotation-z={z}
				scale={scaleBg}
			>
				<meshBasicMaterial
					depthTest={false}
					depthWrite={false}
					color="#D4D0C1"
				/>
			</animated.mesh>
		);
	}
	return (
		<group onClick={handleClick}>
			{skull}
			{skullTransition}
			{skullBg}
		</group>
	);
};

export default Skull;
