import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import styled from "styled-components";

export default function Loading({ setLoaded }) {
	React.useEffect(() => {
		return () => setTimeout(() => setLoaded(true), 100);
	}, []);
	return;
}
export function LoadingScreen({ setLoadScreenOpen, loaded }) {
	const [expand, setExpand] = useState(false);
	const { textOpacity } = useSpring({
		textOpacity: loaded ? 0 : 1,
		onRest: () => (loaded ? setExpand(true) : null),
	});
	const { orbWidth, orbHeight, orbBorderRadius } = useSpring({
		orbWidth: expand ? document.body.clientWidth * 1.5 + "px" : "350px",
		orbHeight: expand ? document.body.clientHeight * 1.5 + "px" : "350px",
		orbBorderRadius: expand ? "0%" : "100%",
		// config: { mass: 1, tension: 120, friction: 14 },
		onRest: () => (expand ? setLoadScreenOpen(false) : null),
	});

	return (
		<LoadingStyled expand={expand}>
			<animated.div
				style={{
					width: orbWidth,
					height: orbHeight,
					borderRadius: orbBorderRadius,
				}}
				className="container"
			>
				<div
					style={{ display: expand ? "none" : "block" }}
					className="loader"
				></div>
				<animated.div style={{ opacity: textOpacity }} className="text">
					Loading...
				</animated.div>
			</animated.div>
		</LoadingStyled>
	);
}

const LoadingStyled = styled.div`
	height: 100vh;
	width: 100vw;
	background: blue;
	z-index: 3;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;

	/* {
		mainColor: "#4B8B70",
		secondaryColor: "#212523",
		contrastColor: "#D2D1C9",
	}, */

	//
	background: radial-gradient(#171a18, #171a18);
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		width: 350px;
		height: 350px;
		border-radius: 100%;
		/* background: linear-gradient(
			165deg,
			rgba(255, 255, 255, 1) 0%,
			rgb(220, 220, 220) 40%,
			rgb(170, 170, 170) 98%,
			rgb(10, 10, 10) 100%
		); */
		background: linear-gradient(
			165deg,
			rgba(110, 174, 147, 1) 0%,
			rgb(75, 139, 112) 40%,
			rgb(25, 89, 62) 98%,
			rgb(10, 10, 10) 100%
		);
		position: relative;
		.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			font-family: "Montserrat", sans-serif;
			text-transform: uppercase;
			font-size: 1rem;
			color: #d2d1c9;
			letter-spacing: 2px;
			/* ::after,
			::before {
				position: absolute;
				content: "";
				height: 1px;
				width: 130%;
				background: #d2d1c9;
			}
			::after {
				top: -1rem;
				left: 50%;
				transform: translateX(-50%);
			}
			::before {
				bottom: -1rem;
				left: 50%;
				transform: translateX(-50%);
			} */
		}
		animation: ${(props) =>
			props.expand ? "none" : "2s scale ease-in-out infinite"};
	}
	.loader {
	}

	.loader:before {
		position: absolute;
		content: "";
		width: 100%;
		height: 100%;
		border-radius: 100%;
		/* border-bottom: 0 solid #ffffff05; */
		border-bottom: 0 solid #4b8b7005;

		/* box-shadow: 0 -10px 20px 20px #ffffff40 inset,
			0 -5px 15px 10px #ffffff50 inset, 0 -2px 5px #ffffff80 inset,
			0 -3px 2px #ffffffbb inset, 0 2px 0px #ffffff, 0 2px 3px #ffffff,
			0 5px 5px #ffffff90, 0 10px 15px #ffffff60,
			0 10px 20px 20px #ffffff40; */
		box-shadow: 0 -10px 20px 20px #4b8b7040 inset,
			0 -5px 15px 10px #4b8b7050 inset, 0 -2px 5px #4b8b7080 inset,
			0 -3px 2px #4b8b70bb inset, 0 2px 0px #4b8b70, 0 2px 3px #4b8b70,
			0 5px 5px #4b8b7090, 0 10px 15px #4b8b7060,
			0 10px 20px 20px #4b8b7040;
		filter: blur(3px);
		animation: 2s rotate linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes scale {
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
	//
`;
