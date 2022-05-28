import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";

import Scene from "./components/Scene";
import Main from "./components/Main";
import { CameraControls } from "./camera-controls";
import styled, { createGlobalStyle } from "styled-components";
import Loading, { LoadingScreen } from "./components/Loading";

const GlobalStyles = createGlobalStyle`
	body,html{
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
	}
`;

function App() {
	const [idx0, setIdx0] = useState(0);
	const [idx1, setIdx1] = useState(1);
	const [idx2, setIdx2] = useState(2);

	const updateIdx = () => {
		if (idx2 === 13) {
			setIdx0(idx1);
			setIdx1(idx2);
			setIdx2(0);
		} else {
			setIdx0(idx1);
			setIdx1(idx2);
			setIdx2(idx2 + 1);
		}
	};

	const cameraControls = useRef(null);

	const [loaded, setLoaded] = useState(false);
	const [loadScreenOpen, setLoadScreenOpen] = useState(true);

	return (
		<>
			<GlobalStyles />
			<AppStyled>
				{/* {true && <LoadingScreen />} */}
				{loadScreenOpen && (
					<LoadingScreen
						setLoadScreenOpen={setLoadScreenOpen}
						loaded={loaded}
					/>
				)}
				<Main cameraControls={cameraControls} currentIdx={idx0} />

				<React.Suspense fallback={null}>
					<Canvas
						className="canvas"
						shadows
						camera={{
							fov: 80,
							near: 0.1,
							far: 1000,
							position: [2, 2, 6],
						}}
					>
						<CameraControls ref={cameraControls} />
						<React.Suspense fallback={null}>
							<Scene
								idx0={idx0}
								idx1={idx1}
								idx2={idx2}
								updateIdx={updateIdx}
								setLoaded={setLoaded}
							/>
						</React.Suspense>
					</Canvas>
				</React.Suspense>
			</AppStyled>
		</>
	);
}

const AppStyled = styled.div`
	width: 100vw;
	height: 100vh;
	.canvas {
		width: 100vw;
		height: 100vh;
	}
`;

export default App;
