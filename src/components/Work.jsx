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
import useWindowWidth from "../hooks/useWindowWidth";

import sortDemonSS from "../screenshots/ss-sort-demon.png";
import pathDemonSS from "../screenshots/ss-path-demon.png";
import warSS from "../screenshots/ss-war.png";
import portfolioSS from "../screenshots/ss-portfolio.png";

export default function Work({
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
					transform:
						containerBlur && windowWidth > 650
							? `translateX(${-6 + i * 1}%) translateY(${
									12 - i * 3.5
							  }%)`
							: null,
				}}
			></div>
		);
	});
	const images = [sortDemonSS, pathDemonSS, warSS, portfolioSS];
	const projectsData = [
		{
			idx: 0,
			subtitle: "Featured Project",
			title: "SORT DEMON",
			description:
				"Visualizer of 30+ unique sorting algorithms, allowing for custom delay time and input array size. Explanations of each algoritm are also included.",
			techs: [
				"React",
				"Redux",
				"Framer Motion",
				"Material UI",
				"Styled Components",
			],
			img: sortDemonSS,
			// img: "https://github.com/copperhuh/SortDemon/raw/main/screenshots/Screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/SortDemon/",
			github: "https://github.com/copperhuh/SortDemon",
		},
		{
			idx: 1,
			subtitle: "Featured Project",
			title: "PATH DEMON",
			description:
				"A responsive visualizer of maze generation and pathfinding algorithms. It succeeds at making the process of understanding these algorithms easy and visually interesting.",
			techs: [
				"React",
				"Redux",
				"Framer Motion",
				"Material UI",
				"Styled Components",
			],
			img: pathDemonSS,
			// img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/PathDemon/",
			github: "https://github.com/copperhuh/PathDemon",
		},
		{
			idx: 2,
			subtitle: "Featured Project",
			title: "WAR",
			description:
				"Simulation of the war card game, built only with vanilla JavaScript, HTML and CSS.",
			techs: ["JavaScript", "CSS", "HTML"],
			img: warSS,
			// img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
			live: "https://copperhuh.github.io/PathDemon/",
			github: "https://github.com/copperhuh/WAR",
		},
		{
			idx: 3,
			subtitle: "Featured Project",
			title: "PORTFOLIO",
			description:
				"My own original portfolio page, heavily utilizing React Three Fiber and use-Spring",
			techs: [
				"React",
				"React Three Fiber",
				"Vite",
				"use-Spring",
				"Styled Components",
			],
			img: portfolioSS,
			// img: "https://github.com/copperhuh/PathDemon/raw/master/screenshots/screenshot-1.png?raw=true",
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
			className={`projects-container-main ${
				projectIdx % 2 === 1 ? "projects-container-main--uneven" : ""
			} `}
			style={{
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-6 + 7 * 1}%) translateY(${
								12 - 7 * 3.5
						  }%)`
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
			images={images}
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
			{windowWidth >= 1080 ? (
				containerBg
			) : (
				<>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[0]}
						contrastColor={contrastColor}
						transition={transition}
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[1]}
						contrastColor={contrastColor}
						transition={transition}
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[2]}
						contrastColor={contrastColor}
						transition={transition}
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[3]}
						contrastColor={contrastColor}
						transition={transition}
						colors={colors}
						windowWidth={windowWidth}
					/>
				</>
			)}
			{/* <div className="title">WORK</div> */}
			{/* <div className="screenshot"></div> */}
		</WorkStyled>
	);
}

const ProjectCard = ({
	projectData,
	currentIdx,
	contrastColor,
	transition,
	colors,
	windowWidth,
}) => {
	const [action, setAction] = useState(null);
	useEffect(() => {
		setTimeout(() => {
			setContainerBlur(true);
			setAction("waiting");
		}, 1000);
	}, []);

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

	const [localIdx, setLocalIdx] = useState(currentIdx);
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
				className={`projects-container-back ${
					"projects-container-back--" + projectData.idx
				}`}
				style={{
					transform:
						containerBlur && windowWidth > 650
							? `translateX(${-6 + i * 1}%) translateY(${
									12 - i * 3.5
							  }%)`
							: null,
				}}
			></div>
		);
	});

	const project = (
		<>
			<a
				href={projectData.live}
				target="_blank"
				className="screenshot"
			></a>
			<div className="flex">
				<h5 className="project-subtitle">{projectData.subtitle}</h5>
				<h2 className="project-title">{projectData.title}</h2>
				<p className="description">{projectData.description}</p>
				<div className="techs">
					{projectData.techs.map((tech, idx) => (
						<div key={idx} className="tech">
							{tech}
						</div>
					))}
				</div>
				<div className="links">
					<a href={projectData.live} target="_blank">
						<LaunchIcon />
					</a>
					<a href={projectData.github} target="_blank">
						<GitHubIcon />
					</a>
				</div>
			</div>
		</>
	);
	containerBg.push(
		<div
			key={7}
			className={`projects-container-main ${
				projectData.idx % 2 === 1
					? "projects-container-main--uneven"
					: ""
			} ${"projects-container-main--" + projectData.idx}`}
			style={{
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-6 + 7 * 1}%) translateY(${
								12 - 7 * 3.5
						  }%)`
						: null,
			}}
		>
			{project}
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
	return containerBg;
};

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
		padding: 1rem 0;
		grid-column: 3/26;
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
			width: 11.8rem;
			height: 100%;
		}
		@media (max-width: 1450px) {
			grid-row: 2/5;
		}
		@media (max-width: 1150px) {
			grid-column: 3/27;
		}
		@media (max-width: 1079px) {
			/* background: #000; */
			/* width: 100%; */
			height: 100%;
			grid-column: 1/31;
			grid-row: 1/3;
			left: 50%;
			transform: translateX(-50%);
			.letter-container {
				width: auto;
				margin: 0 0.2rem;
			}
		}
		@media (max-width: 400px) {
			grid-row: 1/2;
		}
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		/* background: #21252370; */
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 6/20;
		grid-row: 7/17;
		transition: transform 0.4s;
		position: relative;
		/* border-radius: 2%; */
		/* border: 2px solid #4b8c7190; */
		@media (max-width: 1700px) {
			grid-column: 6/21;
			grid-row: 7/17;
		}
		@media (max-width: 1630px) {
			grid-column: 6/22;
		}
		@media (max-width: 1530px) {
			grid-column: 5/22;
		}
		@media (max-width: 1450px) {
			grid-column: 3/22;
			grid-row: 8/18;
		}
		@media (max-width: 1250px) {
			grid-column: 3/23;
			grid-row: 8/18;
		}
		@media (max-width: 1150px) {
			grid-column: 3/24;
			grid-row: 8/18;
		}
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
		/* padding: ${(props) =>
			props.projectIdx % 2 === 1 ? "0 0 0 1.4rem" : "0 1.4rem 0 0"}; */
		padding: 0 0 0 1.4rem;

		color: ${(props) => props.colors.contrastColor};
		/* text-align: ${(props) =>
			props.projectIdx % 2 === 1 ? "left" : "right"}; */
		text-align: left;
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
			/* align-items: ${(props) =>
				props.projectIdx % 2 === 1 ? "start" : "end"}; */
			align-items: start;
			width: 25%;
			padding: 1rem 0;
			box-sizing: border-box;
			/* order: ${(props) => (props.projectIdx % 2 === 1 ? -1 : 3)}; */
			order: -1;
		}

		.project-subtitle {
			font-size: 0.75rem;
			margin: 0.7rem 0 0;
			/* color: #4b8c71; */
			color: ${(props) => props.colors.mainColor};
			/* text-transform: uppercase; */
		}
		.project-title {
			margin: 0 0 0;
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
			/* justify-content: ${(props) =>
				props.projectIdx % 2 === 1 ? "start" : "end"}; */
			justify-content: start;
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

			text-align: left;
			@media (max-width: 500px) {
				width: 100%;
				box-sizing: border-box;
			}
		}
		.screenshot {
			order: 2;
			/* grid-column: 1/14;
			grid-row: 3/7; */
			width: 70%;
			background: ${(props) => `url(${props.url}) no-repeat`};
			background-color: #151515;
			/* background-color: ${(props) => props.colors.contrastColor}; */
			background-size: contain;
			background-position: center;
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
		@media (max-width: 850px) {
			.flex {
				width: 100%;
				z-index: 2;
			}
			.screenshot {
				display: none;
			}
			::before {
				content: "";
				/* background: ${(props) => `url(${props.url}) no-repeat`}; */
				/* background-size: cover; */
				position: absolute;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;
				opacity: 0.2;
			}
		}
	}
	.projects-container-main--uneven {
		padding: 0 1.4rem 0 0;
		text-align: right;
		.flex {
			align-items: end;
			order: 3;
		}
		.techs {
			justify-content: end;
		}
		.description {
			text-align: right;
		}
	}

	.projects-container-main--0,
	.projects-container-back--0,
	.projects-container-main--1,
	.projects-container-back--1,
	.projects-container-main--2,
	.projects-container-back--2,
	.projects-container-main--3,
	.projects-container-back--3 {
		grid-column: 3/28;
		@media (max-width: 500px) {
			box-sizing: border-box;
			padding: 0 0.8rem;
		}
		@media (max-width: 650px) {
			grid-column: 2/29;
		}
	}

	.projects-container-main--0,
	.projects-container-back--0 {
		grid-row: 4/7;
		@media (max-width: 400px) {
			grid-row: 3/6;
		}
	}
	.projects-container-main--0 {
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[0]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--1,
	.projects-container-back--1 {
		grid-row: 8/11;
		@media (max-width: 400px) {
			grid-row: 7/10;
		}
	}
	.projects-container-main--1 {
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[1]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--2,
	.projects-container-back--2 {
		grid-row: 12/15;
		@media (max-width: 400px) {
			grid-row: 11/14;
		}
	}
	.projects-container-main--2 {
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[2]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--3,
	.projects-container-back--3 {
		grid-row: 16/19;
		@media (max-width: 400px) {
			grid-row: 15/18;
		}
	}
	.projects-container-main--3 {
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[3]}) no-repeat`};
				background-size: cover;
			}
		}
	}

	.bottom-section,
	.right-section,
	.left-section {
		z-index: 4;
		@media (max-width: 1450px) {
			display: none;
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
		width: 220px;
		left: auto;
		right: 2rem;
		.letter-container {
			width: 100%;
			height: calc(85% / 5);
		}
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
		font-family: "BIZ UDPMincho", serif;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
	}
`;
