import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import svgLetterData from "../../svgLetterData";
import Letter from "../Letter";
import SvgWord from "../SvgWord";
import headshot from "../../headshot.jpg";
import useWindowWidth from "../../hooks/useWindowWidth";
import AboutStyled from "./AboutStyled";

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
