import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import svgLetterData from "../svgLetterData";
import Letter from "./Letter";
import SvgWord from "./SvgWord";

import headshot from "../headshot.jpg";

export default function About({
	contrastColor,
	transition,
	colors,
	currentIdx,
}) {
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
					transform: containerBlur
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
				transform: containerBlur
					? `translateX(${-6 + 7 * 1}%) translateY(${12 - 7 * 2}%)`
					: null,
			}}
		>
			<div className="text">
				<p className="with-bg">
					Hi, I'm Jakub, a <span>self-taught</span>{" "}
					<span>front-end</span> developer based in Warsaw, Poland.
				</p>
				<p>
					I've been coding for close to 3 years now, and about a year
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
			<div className="screenshot"></div>
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

	.title {
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
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 10/25;
		grid-row: 6/16;
		transition: transform 0.4s;
		position: relative;
	}
	.projects-container-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
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
			}
		}
		.screenshot {
			order: 2;
			/* grid-column: 1/14;
		grid-row: 3/7; */
			width: 45%;
			background: ${(props) => `url(${props.headshot}) no-repeat`};
			background-color: #151515;
			/* background-color: ${(props) => props.colors.contrastColor}; */
			background-size: cover;
			background-position: 0% 25%;
			/* background: #4b8c7170; */
			/* img {
			width: 100%;
			height: 100%;
			background-size: contain;
		} */
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
		height: 85%;
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
			height: 20%;
		}
	}
	.right-svg-word {
		left: auto;
		right: 1rem;
	}

	.bottom-svg-word {
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
