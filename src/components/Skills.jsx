import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import svgLetterData from "../svgLetterData";
import Letter from "./Letter";
import SvgWord from "./SvgWord";

export default function Skills({
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
						? `translateX(${-i * 1.2}%) translateY(${
								12 - i * 2.5
						  }%)`
						: null,
				}}
			></div>
		);
	});

	const icons = [
		{ name: "JavaScript", class: "devicon-javascript-plain" },
		{ name: "React", class: "devicon-react-original" },
		{ name: "TypeScript", class: "devicon-typescript-plain" },
		{ name: "Redux", class: "devicon-redux-original" },
		{ name: "HTML5", class: "devicon-html5-plain" },
		{ name: "CSS3", class: "devicon-css3-plain" },
		{ name: "SASS/SCSS", class: "devicon-sass-original" },
		{ name: "Python", class: "devicon-python-plain" },
		{ name: "Material UI", class: "devicon-materialui-plain" },
		{ name: "Github", class: "devicon-github-original" },
		{ name: "Git", class: "devicon-git-plain" },
		{ name: "Webpack", class: "devicon-webpack-plain" },
	];

	const iconsSection = (
		<div className="icon-container">
			<div className="subtitle">
				<div className="subtitle-text">Tech I use</div>
			</div>
			{icons.map((icon, idx) => (
				<div key={idx} className="icon">
					<i className={icon.class}></i>
					<div className="icon-name">{icon.name}</div>
				</div>
			))}
		</div>
	);

	containerBg.push(
		<div
			key={7}
			className="projects-container-main"
			style={{
				transform: containerBlur
					? `translateX(${-7 * 1.2}%) translateY(${12 - 7 * 2.5}%)`
					: null,
			}}
		>
			<div className="text"></div>
			{iconsSection}
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

	const letters = "SKILLS".split("").map((letter, idx) => {
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
		<SkillsStyled colors={colors[localIdx]}>
			<SvgWord
				color={contrastColor}
				side="bottom"
				name="CONTACT"
				transition={transition}
			/>
			<SvgWord
				color={contrastColor}
				side="right"
				name="HOME"
				transition={transition}
			/>
			<div className="title">{letters}</div>
			{containerBg}
		</SkillsStyled>
	);
}

const SkillsStyled = styled.div`
	position: relative;
	height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	.title {
		padding: 1rem;
		grid-column: 9/21;
		grid-row: 1/4;
		z-index: 3;
		width: 90%;
		height: 93%;
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
		}
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 12/27;
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
		}
		.icon-container {
			height: 100%;
			width: 47%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			box-sizing: border-box;
			.subtitle {
				width: 100%;
				height: 16%;
				display: flex;
				justify-content: end;
				align-items: center;
				font-size: 1.7rem;
				/* padding: 0 1rem 1rem 0; */
				padding-bottom: 0.7rem;
				padding-right: 1.2rem;
				box-sizing: border-box;
				color: ${(props) => props.colors.mainColor};
				text-transform: uppercase;
				letter-spacing: 0.07rem;
				.subtitle-text {
					background: ${(props) => props.colors.contrastColor};
					padding: 0.2rem 0.5rem 0.2rem 6rem;
					margin-right: -0.7rem;
				}
			}
			.icon {
				height: 28%;
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				/* border: 1px solid white; */
				i {
					color: ${(props) => props.colors.contrastColor};
					font-size: 2.6rem;
					padding: 0.7rem 0.6rem 0.5rem;
					/* border-radius: 20%; */
					background: ${(props) => props.colors.mainColor};
				}
				.icon-name {
					padding: 0.7rem 0 0;
					font-weight: 600;
					font-size: 0.8rem;
				}
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

	.left-section,
	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.left-section {
		grid-column: 1/5;
		grid-row: 1/21;
	}
	.bottom-section {
		grid-column: 1/31;
		grid-row: 17/21;
	}
	.right-section {
		grid-column: 24/31;
		grid-row: 1/21;
	}

	.left-svg-word,
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
	.left {
		left: 30px;
		top: 45%;
		transform: translateY(-50%);
	}
	.arrow-left {
		transform: rotate(90deg);
	}
	.right {
		right: 30px;
		top: 45%;
		transform: translateY(-50%);
		flex-direction: column;
	}
	.arrow-right {
		transform: rotate(180deg);
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
