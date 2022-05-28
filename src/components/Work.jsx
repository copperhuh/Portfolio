import React, { useEffect, useState } from "react";
import styled from "styled-components";
import svgLetterData from "../svgLetterData";
import Letter from "./Letter";
import SvgWord from "./SvgWord";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { animated, useSpring } from "@react-spring/web";

export default function Work({
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
			if (action === "nextProject") {
				setProjectIdx(projectIdx + 1);
			} else if (action === "prevProject") {
				setProjectIdx(projectIdx - 1);
			} else if (action === "changeTheme") {
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
								12 - i * 3.5
						  }%)`
						: null,
				}}
			></div>
		);
	});
	const projectsData = [
		{
			subtitle: "Featured Project",
			title: "SORT DEMON",
			description:
				"Visualizer of 30+ unique sorting algorithms, allowing for custom delay time and input array size.",
			techs: [
				"React",
				"Redux",
				"Framer Motion",
				"Material UI",
				"Styled Components",
			],
			img: "https://github.com/copperhuh/SortDemon/raw/main/screenshots/Screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/SortDemon/",
			github: "https://github.com/copperhuh/SortDemon",
		},
		{
			subtitle: "Featured Project",
			title: "PATH DEMON",
			description:
				"A responsive visualizer of maze generation and pathfinding algorithms. It succeeds at making the process of understanding maze generation and pathfinding easy and visually interesting.",
			techs: [
				"React",
				"Redux",
				"Framer Motion",
				"Material UI",
				"Styled Components",
			],
			img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/PathDemon/",
			github: "https://github.com/copperhuh/PathDemon",
		},
		{
			subtitle: "Featured Project",
			title: "WAR",
			description: "Simulation of the war card game",
			techs: ["JavaScript", "CSS", "HTML"],
			img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/PathDemon/",
			github: "https://github.com/copperhuh/WAR",
		},
		{
			subtitle: "Featured Project",
			title: "PORTFOLIO",
			description: "Simulation of the war card game",
			techs: [
				"React",
				"React Three Fiber",
				"use-Spring",
				"Styled Components",
			],
			img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/PathDemon/",
			github: "https://github.com/copperhuh/WAR",
		},
	];
	const [projectIdx, setProjectIdx] = useState(0);
	const project = (
		<>
			<a
				href={projectsData[projectIdx].live}
				target="_blank"
				className="screenshot"
			></a>
			<div className="flex">
				<h5 className="project-subtitle">
					{projectsData[projectIdx].subtitle}
				</h5>
				<h2 className="project-title">
					{projectsData[projectIdx].title}
				</h2>
				<p className="description">
					{projectsData[projectIdx].description}
				</p>
				<div className="techs">
					{projectsData[projectIdx].techs.map((tech, idx) => (
						<div key={idx} className="tech">
							{tech}
						</div>
					))}
				</div>
				<div className="links">
					<a href={projectsData[projectIdx].live} target="_blank">
						<LaunchIcon />
					</a>
					<a href={projectsData[projectIdx].github} target="_blank">
						<GitHubIcon />
					</a>
				</div>
			</div>
		</>
	);
	const nextProject = () => {
		if (action === "waiting") {
			setObscure(true);
			setContainerBlur(false);
			setAction("nextProject");
		}
	};
	const prevProject = () => {
		if (action === "waiting") {
			setObscure(true);
			setContainerBlur(false);
			setAction("prevProject");
		}
	};
	containerBg.push(
		<div
			key={7}
			className="projects-container-main"
			style={{
				transform: containerBlur
					? `translateX(${-6 + 7 * 1}%) translateY(${12 - 7 * 3.5}%)`
					: null,
			}}
		>
			{project}
			<button
				onClick={prevProject}
				disabled={projectIdx === 0}
				className="prev-project btn"
			>
				<KeyboardArrowLeftIcon />
			</button>
			<button
				onClick={nextProject}
				disabled={projectIdx === projectsData.length - 1}
				className="next-project btn"
			>
				<KeyboardArrowRightIcon />
			</button>
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

	const letters = "WORK".split("").map((letter, idx) => {
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
		<WorkStyled
			url={projectsData[projectIdx].img}
			colors={colors[localIdx]}
			projectIdx={projectIdx}
		>
			<SvgWord
				color={contrastColor}
				side="bottom"
				name="CONTACT"
				transition={transition}
			/>
			<SvgWord
				color={contrastColor}
				side="left"
				name="HOME"
				transition={transition}
			/>

			<div className="title">{letters}</div>
			{containerBg}
			{/* <div className="title">WORK</div> */}
			{/* <div className="screenshot"></div> */}
		</WorkStyled>
	);
}

const WorkStyled = styled.div`
	position: relative;
	height: 100%;
	max-height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);
	.left-section,
	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.title {
		padding: 2rem;

		grid-column: 9/21;
		grid-row: 1/4;
		z-index: 3;
		color: #212523;
		width: 80%;
		height: 93%;
		position: absolute;
		/* top: 10%; */
		/* left: 10%; */
		display: flex;
		svg {
			fill: none;
			/* fill: #d2d1c9a0; */
			max-height: 100%;
			max-width: 100%;
			/* overflow: visible; */
		}
		.letter-container {
			display: flex;
			justify-content: center;
			align-items: center;
			/* width: 25%; */
			height: 100%;
		}
	}
	/* .screenshot {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 29rem;
		height: 18rem;
		background: #212523;
		transform: translateY(25%) translateX(35%);
	} */

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		/* background: #21252370; */
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 6/20;
		grid-row: 7/16;
		transition: transform 0.4s;
		position: relative;
		/* border-radius: 2%; */
		/* border: 2px solid #4b8c7190; */
	}
	.projects-container-main {
		/* background: #212523; */
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		/* display: grid; */
		/* grid-template: repeat(10, 1fr) / repeat(20, 1fr); */
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
		position: relative;
		justify-content: space-between;
		padding: ${(props) =>
			props.projectIdx % 2 === 1 ? "0 0 0 1.4rem" : "0 1.4rem 0 0"};
		color: ${(props) => props.colors.contrastColor};
		/* color: #d2d1c9; */
		/* .obscure {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: block;
		} */
		.btn {
			position: absolute;
			/* bottom: -16%; */
			bottom: -16%;
			/* left: 50%; */
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.5rem;
			height: 2.5rem;
			border: none;
			background: ${(props) => props.colors.contrastColor};
			/* background: #d2d1c9; */
			/* color: #212523; */
			color: ${(props) => props.colors.secondaryColor};
			transition: all 0.15s;
			/* :hover {
				background: #4b8c71;
				color: #d2d1c9;
			} */
			/* :disabled {
				background: #d2d1c950;
				color: #21252350;
			} */
		}
		.next-project {
			right: 0;
			top: 50%;
			transform: translateX(150%);
			:hover {
				transform: translateY(-10%) translateX(150%);
			}
			:disabled {
				/* background: #d2d1c950; */
				background: ${(props) => props.colors.contrastColor + "50"};
				/* color: #21252350; */
				color: ${(props) => props.colors.secondaryColor + "50"};
				transform: translateX(150%);
			}
			/* transform: translateY(-50%) translateX(100%); */
			/* border-radius: 0 50% 50% 0; */
		}
		.prev-project {
			/* border-radius: 50% 0 0 50%; */
			left: 0;
			top: 50%;
			transform: translateX(-150%);
			:hover {
				transform: translateY(-10%) translateX(-150%);
			}
			:disabled {
				/* background: #d2d1c950; */
				background: ${(props) => props.colors.contrastColor + "50"};
				/* color: #21252350; */
				color: ${(props) => props.colors.secondaryColor + "50"};
				transform: translateX(-150%);
			}
			/* transform: translateY(-50%) translateX(-100%); */
		}
		.flex {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: ${(props) =>
				props.projectIdx % 2 === 1 ? "start" : "end"};
			width: 25%;
			padding: 1rem 0;
			box-sizing: border-box;
			order: ${(props) => (props.projectIdx % 2 === 1 ? -1 : 3)};
		}
		.project-subtitle {
			font-size: 0.75rem;
			margin: 0.7rem 0 0;
			/* color: #4b8c71; */
			color: ${(props) => props.colors.mainColor};
			/* text-transform: uppercase; */
		}
		.project-title {
			margin: -1rem 0 0;
			/* grid-column: 1/21;
			grid-row: 1/3; */
			/* text-align: center; */
			/* font-family: "BIZ UDPMincho", serif; */
			font-size: 1.6rem;
			font-weight: 400;
			letter-spacing: 0.1rem;
		}
		.techs {
			/* grid-column: 1/14;
			grid-row: 8/10; */
			/* font-family: "BIZ UDPMincho", serif; */
			margin: 0.5rem 0;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: 0.75rem;
			justify-content: ${(props) =>
				props.projectIdx % 2 === 1 ? "start" : "end"};
			.tech {
				margin: 0.2rem 0.5rem;
			}
		}
		.description {
			/* grid-column: 15/21;
			grid-row: 3/7; */
			color: white;
			font-size: 1rem;
			letter-spacing: 0.1rem;
			/* color: #212523; */
			color: ${(props) => props.colors.secondaryColor};
			background: ${(props) => props.colors.contrastColor};
			/* background: #d2d1c9; */
			width: 22rem;
			z-index: 1;
			padding: 1rem;
			text-align: ${(props) =>
				props.projectIdx % 2 === 1 ? "left" : "right"};
		}
		.screenshot {
			order: 2;
			/* grid-column: 1/14;
			grid-row: 3/7; */
			width: 70%;
			background: ${(props) => `url(${props.url}) no-repeat`};
			background-size: cover;
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
				background: ${(props) => props.colors.mainColor + "70"};
				/* background: #4b8c7170; */
				top: 0;
				left: 0;
				opacity: 1;
				transition: all 0.4s;
			}
			:hover::after {
				opacity: 0;
			}
		}
		.links {
			/* grid-column: 15/21; */
			/* grid-row: 8/10; */
			a {
				color: ${(props) => props.colors.contrastColor};
				/* color: #d2d1c9; */
				padding: 0.3rem;
				transition: color 0.3s;
				:hover {
					/* color: #4b8c71; */
					color: ${(props) => props.colors.mainColor};
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
		width: 220px;
		left: auto;
		right: 2rem;
		.letter-container {
			width: 100%;
			height: calc(85% / 5);
		}
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
		flex-direction: column;
	}
	.arrow-left {
		transform: rotate(90deg);
	}
	.right {
		right: 30px;
		top: 45%;
		transform: translateY(-50%);
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
