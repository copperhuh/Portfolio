import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import svgLetterData from "../../svgLetterData";
import Letter from "./../Letter";
import SvgWord from "./../SvgWord";
import useWindowWidth from "../../hooks/useWindowWidth";
import SkillsStyled from "./SkillsStyled";

export default function Skills({
	contrastColor,
	transition,
	colors,
	currentIdx,
}) {
	const windowWidth = useWindowWidth();

	const [action, setAction] = useState(null);
	useEffect(() => {
		document.documentElement.scrollTop = 0;

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
		{ name: "ReactJS", class: "devicon-react-original" },
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
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-7 * 1.2}%) translateY(${
								12 - 7 * 2.5
						  }%)`
						: null,
			}}
		>
			<div className="text">
				<p>
					I specialize in <span>front-end</span> development of
					responsive, user-friendly websites, mainly using{" "}
					<span>ReactJS</span>. I also have experience in UI and UX
					design.
				</p>
				<p>
					I enjoy bringing life to creative and/or crazy designs, as
					well as working on ambitious projects that force me to
					deepen my understanding of various technologies.
				</p>
				<p>
					Currently, I'm looking forward to learning{" "}
					<span>Next.js</span> and <span>Gatsby</span>. I also see
					myself learning some <span>back-end</span> in the future.
				</p>
			</div>
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
