import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

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

	const handleClick = (e) => {
		if (transitionOngoing || !moveSkull) return;
		e.stopPropagation();
		setTransitionOngoing(true);
		setActive(true);
		setTimeout(() => {
			setActive(false);
			setMainColor(false);
			setTimeout(() => {
				updateIdx();
				setMainColor(true);
				setTimeout(() => {
					setTransitionOngoing(false);
				}, 700);
			}, 150);
		}, 300);
	};

	const { nodes } = useLoader(GLTFLoader, "./skull/scene.gltf");
	const skull = [];
	for (let i = 2; i <= 7; i++) {
		skull.push(
			<animated.mesh
				key={i}
				renderOrder={999}
				geometry={nodes[`Object_${i}`].geometry}
				position-x={0.5}
				position-y={v}
				position-z={2}
				rotation-x={x}
				rotation-y={y}
				rotation-z={z}
				scale={scale}
			>
				{mainColor ? themes[idx0].material : themes[idx1].material}
			</animated.mesh>
		);
	}
	const skullTransition = [];
	for (let i = 2; i <= 7; i++) {
		skullTransition.push(
			<animated.mesh
				key={i}
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
				{themes[idx1].material}
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
