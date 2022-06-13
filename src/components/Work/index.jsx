import React, { useEffect, useState } from "react";
import svgLetterData from "../../svgLetterData";
import Letter from "./../Letter";
import SvgWord from "./../SvgWord";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { animated, useSpring } from "@react-spring/web";
import useWindowWidth from "../../hooks/useWindowWidth";

import sortDemonSS from "../../screenshots/ss-sort-demon.png";
import pathDemonSS from "../../screenshots/ss-path-demon.png";
import warSS from "../../screenshots/ss-war.png";
import portfolioSS from "../../screenshots/ss-portfolio.png";
import WorkStyled from "./WorkStyled";

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
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[1]}
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[2]}
						colors={colors}
						windowWidth={windowWidth}
					/>
					<ProjectCard
						currentIdx={currentIdx}
						projectData={projectsData[3]}
						colors={colors}
						windowWidth={windowWidth}
					/>
				</>
			)}
		</WorkStyled>
	);
}

const ProjectCard = ({ projectData, currentIdx, colors, windowWidth }) => {
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
