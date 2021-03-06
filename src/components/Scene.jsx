import React, { Suspense, useState } from "react";
import useTheme from "../themes";
import CirclesAnim from "./CircleAnim";
import Skull from "./Skull";
import Loading from "./Loading";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

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
	const circleGeometry = <circleBufferGeometry args={[5, 150]} />;
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
				geometry={circleGeometry}
			/>
		);
	}

	return (
		<>
			<ambientLight intensity={0.3} />
			<pointLight position={[15, 19, 27]} intensity={0.4} />
			<pointLight position={[-10, 0, -20]} intensity={0.5} />
			<pointLight position={[0, -10, 0]} intensity={0.4} />
			<Suspense fallback={<Loading setLoaded={setLoaded} />}>
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
				<AdaptiveDpr pixelated />
				<AdaptiveEvents />
			</Suspense>
		</>
	);
}

export default Scene;
