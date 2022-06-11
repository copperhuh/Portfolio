import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import svgLetterData from "../svgLetterData";
import Letter from "./Letter";
import SvgWord from "./SvgWord";

import headshot from "../headshot.jpg";
import useWindowWidth from "../hooks/useWindowWidth";

export default function About({
	contrastColor,
	transition,
	colors,
	currentIdx,
}) {
	const windowWidth = useWindowWidth();

	const [action, setAction] = useState(null);
	useEffect(() => {
		setTimeout(() => {
			setContainerBlur(true);
			setAction("waiting");
		}, 1000);
	}, []);

	const [localIdx, setLocalIdx] = useState(currentIdx);
	useEffect(() => {
		if (action) {
			setObscure(true);
			setContainerBlur(false);
			setAction("changeTheme");
		}
	}, [currentIdx]);

	const [containerBlur, setContainerBlur] = useState(false);
	const [obscured, setObscured] = useState(false);
	const [obscure, setObscure] = useState(false);
	const [obscureBorder, setObscureBorder] = useState(false);
	const [obscureSide, setObscureSide] = useState(true);

	const { obscureSize } = useSpring({
		obscureSize: obscure ? "100%" : "0%",
		config: { duration: 200 },
		onRest: () => {
			if (obscure) {
				setObscureBorder(true);
			} else {
				setObscureSide(true);
				setAction("waiting");
			}
		},
	});

	const { obscureBorderSize } = useSpring({
		obscureBorderSize: obscureBorder ? "0%" : "100%",
		config: { duration: 200 },
		onRest: () => {
			if (obscureBorder) setObscured(true);
			if (!obscureBorder) setObscure(false);
		},
	});

	useEffect(() => {
		if (obscured) {
			if (action === "changeTheme") {
				setLocalIdx(currentIdx);
			}
			setObscureBorder(false);
			setObscureSide(false);
			setObscured(false);
			setContainerBlur(true);
		}
	}, [obscured]);

	const containerBg = new Array(7).fill(null).map((_, i) => {
		return (
			<div
				key={i}
				className="projects-container-back"
				style={{
					transform:
						containerBlur && windowWidth > 650
							? `translateX(${-6 + i * 1}%) translateY(${
									12 - i * 2
							  }%)`
							: null,
				}}
			></div>
		);
	});

	containerBg.push(
		<div
			key={7}
			className="projects-container-main"
			style={{
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-6 + 7 * 1}%) translateY(${
								12 - 7 * 2
						  }%)`
						: null,
			}}
		>
			<div className="text">
				<p className="with-bg">
					Hi, I'm Jakub, a <span>self-taught</span>{" "}
					<span>front-end</span> developer based in Warsaw, Poland.
				</p>
				<p>
					I've been coding for close to 4 years now, and about a year
					ago decided on making <span>front-end</span> my{" "}
					<span>full-time</span> focus. Since then, I've made many
					personal projects, finished various online courses, and
					finally created a portfolio that I'm satisfied with.
				</p>
				<p>
					Right now, I feel confident in my current skills and looking
					for opportunities to test them in a professional setting.
				</p>
			</div>
			<div className="headshot"></div>
			<animated.div
				className="obscure"
				style={{
					width: obscureSize,
					height: obscureSize,
					borderTopLeftRadius: obscureSide ? 0 : obscureBorderSize,
					borderBottomRightRadius: obscureSide
						? obscureBorderSize
						: 0,
					position: "absolute",
					background: colors[currentIdx].mainColor,
					top: obscureSide ? 0 : "auto",
					bottom: obscureSide ? "auto" : 0,
					left: obscureSide ? 0 : "auto",
					right: obscureSide ? "auto" : 0,
					zIndex: 10,
				}}
			></animated.div>
		</div>
	);

	const letters = "ABOUT".split("").map((letter, idx) => {
		return (
			<div key={idx} className="letter-container">
				<Letter
					stroke={contrastColor}
					{...svgLetterData[letter.toLowerCase()]}
					toggle={action}
					button={false}
				/>
			</div>
		);
	});

	return (
		<AboutStyled headshot={headshot} colors={colors[localIdx]}>
			<SvgWord
				color={contrastColor}
				side="right"
				name="HOME"
				transition={transition}
			/>
			<SvgWord
				color={contrastColor}
				side="bottom"
				name="CONTACT"
				transition={transition}
			/>
			<div className="title">{letters}</div>
			{containerBg}
		</AboutStyled>
	);
}

const AboutStyled = styled.div`
	position: relative;
	height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	/* .title {
		padding: 1rem;
		grid-column: 12/23;
		grid-row: 1/4;
		z-index: 3;
		width: 94%;
		height: 85%;
		position: absolute;
		display: flex;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
		}
		.letter-container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			flex: 1;
		}
	} */
	.title {
		/* background: #000; */
		padding: 1rem 0;
		grid-column: 7/31;
		grid-row: 1/4;
		z-index: 3;
		width: 90%;
		height: 93%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
			overflow: visible;
		}
		.letter-container {
			width: 8.7rem;
			margin: 0 0.6rem;
			height: 100%;
		}
		@media (max-width: 1550px) {
			grid-column: 6/31;
			/* grid-row: 6/17; */
		}
		@media (max-width: 1450px) {
			grid-row: 2/5;
			grid-column: 7/31;
		}
		@media (max-width: 1230px) {
			grid-column: 7/31;
		}
		@media (max-width: 1100px) {
			grid-column: 6/31;
		}
		@media (max-width: 1050px) {
			.letter-container {
				width: auto;
				margin: 0 0.7rem;
			}
			width: 100%;
			grid-column: 1/31;
			box-sizing: border-box;
			padding: 0 1rem;
			height: 100%;
		}
		@media (max-width: 650px) {
			grid-row: 1/4;
		}
		@media (max-width: 430px) {
			grid-row: 1/3;
		}
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 10/25;
		grid-row: 6/17;
		transition: transform 0.4s;
		position: relative;
		@media (max-width: 1550px) {
			grid-column: 8/25;
			/* grid-row: 6/17; */
		}
		@media (max-width: 1450px) {
			grid-column: 8/27;
			grid-row: 7/18;
		}
		@media (max-width: 1230px) {
			grid-column: 8/29;
			grid-row: 7/19;
		}
		@media (max-width: 1050px) {
			grid-column: 3/29;
			grid-row: 7/19;
		}
		@media (max-width: 850px) {
			grid-column: 6/26;
			grid-row: 6/19;
		}
		@media (max-width: 750px) {
			grid-column: 5/27;
		}
		@media (max-width: 650px) {
			grid-column: 3/28;
			grid-row: 5/20;
		}
		@media (max-width: 500px) {
			grid-column: 2/29;
		}
		@media (max-width: 430px) {
			grid-row: 4/20;
		}
	}
	.projects-container-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
		height: fit-content;
		box-sizing: border-box;
		position: relative;
		justify-content: space-between;
		color: ${(props) => props.colors.contrastColor};
		.text {
			height: 100%;
			width: 53%;
			padding: 0.8rem 1rem 0rem 3rem;
			line-height: 1.6;
			box-sizing: border-box;
			p {
				font-size: 1.078rem;
				span {
					/* color: ${(props) => props.colors.mainColor}; */
					display: inline-block;
				}
			}
			.with-bg {
				font-size: 1.2rem;
				width: 80%;
				color: ${(props) => props.colors.secondaryColor};
				background: ${(props) => props.colors.contrastColor};
				padding: 0.3rem 4rem 0.3rem 1rem;
				margin-left: -1.4rem;
				@media (max-width: 500px) {
					font-size: 1.1rem;
					margin-left: -0.4rem;
					padding-right: 2rem;
				}
				@media (max-width: 400px) {
					font-size: 1.04rem;
					box-sizing: border-box;
					margin-left: 0;
					padding: 0.3rem 1rem;
					width: 100%;
				}
			}
		}
		@media (max-width: 400px) {
			.text p {
				font-size: 1rem;
			}
		}
		.headshot {
			order: 2;
			width: 45%;
			background: ${(props) => `url(${props.headshot}) no-repeat`};
			background-color: #151515;
			background-size: cover;
			background-position: 0% 25%;

			position: relative;
			::after {
				position: absolute;
				content: "";
				width: 100%;
				height: 100%;
				background: ${(props) => props.colors.mainColor + "50"};
				/* background: #4b8c7170; */
				top: 0;
				left: 0;
				opacity: 1;
				transition: all 0.4s;
			}
			/* :hover::after {
				opacity: 0;
			} */
		}
		@media (max-width: 850px) {
			flex-direction: column;
			align-items: center;
			.text {
				height: 50%;
				width: 100%;
				padding: 0.8rem 3rem 1.5rem 3rem;
			}
			.headshot {
				height: 30rem;
				width: 100%;
			}
			/* padding-bottom: 5rem; */
		}
		@media (max-width: 500px) {
			.text {
				padding: 0.8rem 1.5rem 1.5rem 1.5rem;
			}
			.headshot {
				height: 25rem;
			}
		}
		@media (max-width: 350px) {
			.headshot {
				height: 20rem;
			}
		}

		::after {
			position: absolute;
			content: "";
			top: 0;
			left: 0;
			width: 100%;
			height: 0.35rem;
			background: ${(props) => props.colors.mainColor};
		}
	}

	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 4;
		@media (max-width: 1450px) {
			display: none;
		}
	}
	.bottom-section {
		grid-column: 1/31;
		grid-row: 17/21;
	}
	.right-section {
		grid-column: 24/31;
		grid-row: 1/21;
	}

	.right-svg-word,
	.bottom-svg-word {
		position: absolute;
		height: 70%;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
		z-index: 2;
		width: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
			overflow: visible;
		}
		.letter-container {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin: 1rem 0;
			height: 20%;
		}
	}
	.right-svg-word {
		left: auto;
		right: 1rem;
	}

	/* .bottom-svg-word {
		height: 120px;
		top: auto;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		width: 55%;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		.letter-container {
			width: calc(95% / 7);
			height: 100%;
		}
	} */

	.bottom-svg-word {
		height: 70%;
		top: auto;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.letter-container {
			width: 9.5%;
			height: 100%;
		}
	}

	.arrow-container {
		z-index: 1;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.arrow {
		width: 100px;
		height: 100px;
		svg {
			/* fill: #d4d0c1; */
			max-height: 100%;
			max-width: 100%;
		}
	}

	.bottom {
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		flex-direction: row;
	}

	.right {
		right: 30px;
		top: 45%;
		transform: translateY(-50%);
		flex-direction: column;
	}
	.arrow-right {
		transform: rotate(-90deg);
	}

	.arrow-text {
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem;
		margin: 0.6rem;
		/* color: #d4d0c1; */
		font-family: "BIZ UDPMincho", serif;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
	}
`;
