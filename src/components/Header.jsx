import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { animated, useSpring } from "@react-spring/web";

export default function Header({ contrastColor, section, transition }) {
	const [toggleOpacityAll, setToggleOpacityAll] = useState(false);
	const [currentColor, setCurrentColor] = useState(contrastColor);

	useEffect(() => {
		setToggleOpacityAll(true);
	}, [contrastColor]);

	const { opacityAll } = useSpring({
		opacityAll: toggleOpacityAll ? 0 : 1,
		config: { duration: 300 },
		onRest: () => {
			if (toggleOpacityAll) {
				setCurrentColor(contrastColor);
				setToggleOpacityAll(false);
			}
		},
	});

	return (
		<HeaderStyled color={currentColor}>
			<animated.div style={{ opacity: opacityAll }} className="container">
				<div className="left">
					<span className="link" onClick={() => transition(true)}>
						JAKUB KOPER
					</span>
				</div>
				<div className="right">
					<div>
						<span
							className={`link ${
								section === "ABOUT" ? "active" : null
							}`}
							onClick={() => transition("ABOUT")}
						>
							ABOUT
						</span>
					</div>
					<div>
						<span
							className={`link ${
								section === "WORK" ? "active" : null
							}`}
							onClick={() => transition("WORK")}
						>
							WORK
						</span>
					</div>
					<div>
						<span
							className={`link ${
								section === "SKILLS" ? "active" : null
							}`}
							onClick={() => transition("SKILLS")}
						>
							SKILLS
						</span>
					</div>
					<div>
						<span
							className={`link ${
								section === "CONTACT" ? "active" : null
							}`}
							onClick={() => transition("CONTACT")}
						>
							CONTACT
						</span>
					</div>
					<div>
						<span className="link">CV</span>
					</div>
					<GitHubIcon />
					<LinkedInIcon />
				</div>
			</animated.div>
		</HeaderStyled>
	);
}

const HeaderStyled = styled.div`
	width: 100vw;
	font-family: "BIZ UDPMincho", serif;
	padding: 1rem 2rem;
	font-size: 0.75rem;
	/* color: rgb(40, 43, 42);
	color: #d4d0c1;
	color: #212523; */
	color: ${(props) => props.color};
	letter-spacing: 0.1rem;
	box-sizing: border-box;
	.container {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.right {
		> * {
			padding: 0 0.35rem;
			user-select: none;
			z-index: 1;
		}
		.MuiSvgIcon-root {
			padding: 0 0.2rem;
			font-size: 1.2rem;
			transition: 0.2s;
			transform: scale(1);
			:hover {
				transition: 0.2s;
				transform: scale(1.2);
			}
		}
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left {
		z-index: 1;
		user-select: none;
	}
	.link {
		position: relative;
		padding: 1rem 0;
		display: block;
		:after {
			position: absolute;
			content: "";
			height: 1px;
			bottom: 10px;
			transition: 0.2s;
			margin: 0 auto;
			left: 0;
			right: 0;
			width: 0%;
			/* background: #d4d0c1;
			background: #212523; */
			background: ${(props) => props.color};
		}

		:hover:after {
			width: 100%;
		}
	}
	.active:after {
		position: absolute;
		content: "";
		height: 1px;
		bottom: 10px;
		transition: 0.2s;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 100%;
		/* background: #d4d0c1;
		background: #212523; */
		background: ${(props) => props.color};
	}
`;
