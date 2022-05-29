import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function LandingPage({
	cameraControls,
	setFade,
	fade,
	setMoveSkull,
	setLandingOpen,
}) {
	useEffect(() => {
		cameraControls.current.setLookAt(2, 3, 6, 0, 1, 0, false);
		cameraControls.current.zoomTo(50, false);
	}, []);
	const [reverseFlag, setReverseFlag] = useState(false);

	const fadeOut = (e) => {
		if (!reverseFlag) {
			setReverseFlag(true);
			setN(n - 1);
		}
		// e.stopPropagation();
		// if (fade) return;
		// setFade(true);
		// setMoveSkull(true);
		// cameraControls.current.setLookAt(2, 2, 6, 0, 0, 0, true);
		// cameraControls.current.zoomTo(1, true);
		console.log("aaa");
		// setTimeout(() => {
		// 	console.log("bbb");
		// setLandingOpen(false);
		// }, 600);
	};

	const [zoomFlag, setZoomFlag] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			if (reverseFlag) return;
			if (zoomFlag) {
				cameraControls.current.zoomTo(45, true);
				console.log("eee1");
			} else {
				cameraControls.current.zoomTo(50, true);
				console.log("eee2");
			}
			setZoomFlag(!zoomFlag);
		}, 100);
	}, [zoomFlag]);

	const [n, setN] = useState(0);
	useEffect(() => {
		setTimeout(async () => {
			if (reverseFlag) {
				if (n === 0) {
					setTimeout(async () => {
						setFade(true);
						setMoveSkull(true);
						await cameraControls.current.zoomTo(1, true);
						await cameraControls.current.setLookAt(
							2,
							2,
							6,
							0,
							0,
							0,
							true
						);
					}, 300);
					return;
				}
				// console.log("ddd");
				setN(n - 1);
			} else {
				if (n === h2.length + 2 + h3.length) return;
				// if (n === h2.length + 2 + h3.length + 3) setReverseFlag(true);
				// console.log("ccc");
				setN(n + 1);
			}
		}, 50);
	}, [n, reverseFlag]);

	const h2 = "Jakub Koper".split("");
	const h3 = "Front End Developer".split("");
	return (
		<LandingStyled onClick={fadeOut}>
			<h2>{h2.slice(0, n)}</h2>
			<h3>{h3.slice(0, n >= h2.length + 2 ? n - (h2.length + 2) : 0)}</h3>
			<div onClick={fadeOut} className="event-catcher"></div>
		</LandingStyled>
	);
}

const LandingStyled = styled.div`
	position: absolute;
	z-index: 4;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	font-family: "Montserrat", sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #d2d1c9;
	.event-catcher {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
	}
	h2,
	h3 {
		/* position: relative; */
		letter-spacing: 1px;
		font-weight: 500;
		margin: 1.2rem;
		background: #d2d1c9;
		background: #212523;
		padding: 0rem 0.5rem;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.7rem;
	}
`;
