import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { animated, useSpring } from "@react-spring/web";
import useWindowWidth from "../../hooks/useWindowWidth";
import HeaderStyled from "./HeaderStyled";

export default function Header({
	contrastColor,
	section,
	transition,
	bgColor,
	secondaryColor,
}) {
	const windowWidth = useWindowWidth();

	const [toggleOpacityAll, setToggleOpacityAll] = useState(false);
	const [currentColor, setCurrentColor] = useState(contrastColor);

	useEffect(() => {
		if (windowWidth < 1080 || contrastColor !== currentColor) {
			setToggleOpacityAll(true);
		}
	}, [contrastColor, bgColor, secondaryColor]);

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
		<HeaderStyled
			color={currentColor}
			bgColor={bgColor}
			secondaryColor={secondaryColor}
			width={windowWidth}
		>
			<animated.div style={{ opacity: opacityAll }} className="container">
				<div className="left">
					<span className="link" onClick={() => transition("HOME")}>
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
					<div className="break">
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
