import React, { useState } from "react";
import { colors } from "../../themes";
import About from "../About";
import Contact from "../Contact";
import Header from "../Header";
import Home from "../Home";
import MainStyled from "./MainStyled";
import Skills from "../Skills";
import TransitionScreen from "../TransitionScreen";
import Work from "../Work";

export default function Main({ cameraControls, currentIdx }) {
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState("HOME");
	const [prevSection, setPrevSection] = useState("HOME");

	const transition = (sectionName) => {
		if (sectionName === section) return;
		setOpen(sectionName);
		setTimeout(() => {
			setPrevSection(section);
			setSection(sectionName);
			cameraControls.current.zoomTo(1);
			if (sectionName === "ABOUT") {
				cameraControls.current.setLookAt(
					7.812,
					0.184,
					8.452,
					8.059,
					0.695,
					0.205,
					false
				);
			} else if (sectionName === "WORK") {
				cameraControls.current.setLookAt(
					-0.284,
					1.353,
					6.847,
					-5.413,
					1.118,
					0.741,
					false
				);
			} else if (sectionName === "SKILLS") {
				cameraControls.current.setLookAt(
					9.171,
					1.411,
					-0.394,
					7.407,
					1.527,
					-1.537,
					false
				);
			} else if (sectionName === "CONTACT") {
				cameraControls.current.setLookAt(
					-8.832,
					-1.994,
					-0.087,
					-2.722,
					-0.103,
					-5.015,
					false
				);
			} else if (sectionName === "CONTACT") {
				cameraControls.current.setLookAt(
					-8.832,
					-1.994,
					-0.087,
					-2.722,
					-0.103,
					-5.015,
					false
				);
			} else {
				cameraControls.current.setLookAt(2, 2, 6, 0, 0, 0, false);
			}
		}, 200);
	};
	return (
		<MainStyled>
			<Header
				contrastColor={colors[currentIdx].contrastColor}
				section={section}
				transition={transition}
				bgColor={colors[currentIdx].mainColor}
				secondaryColor={colors[currentIdx].secondaryColor}
			/>
			<div className="content">
				{section === "SKILLS" ? (
					<Skills
						contrastColor={colors[currentIdx].contrastColor}
						transition={transition}
						colors={colors}
						currentIdx={currentIdx}
					/>
				) : section === "WORK" ? (
					<Work
						contrastColor={colors[currentIdx].contrastColor}
						transition={transition}
						colors={colors}
						currentIdx={currentIdx}
					/>
				) : section === "ABOUT" ? (
					<About
						contrastColor={colors[currentIdx].contrastColor}
						transition={transition}
						colors={colors}
						currentIdx={currentIdx}
					/>
				) : section === "CONTACT" ? (
					<Contact
						contrastColor={colors[currentIdx].contrastColor}
						prevSection={prevSection}
						transition={transition}
						colors={colors}
						currentIdx={currentIdx}
					/>
				) : (
					<Home
						contrastColor={colors[currentIdx].contrastColor}
						transition={transition}
					/>
				)}
			</div>
			{open && (
				<TransitionScreen
					currentIdx={currentIdx}
					setOpenExt={setOpen}
					text={open}
				/>
			)}
		</MainStyled>
	);
}
