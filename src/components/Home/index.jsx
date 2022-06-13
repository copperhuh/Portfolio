import React from "react";
import HomeStyled from "./HomeStyled";
import SvgWord from "../SvgWord";

export default function Home({ contrastColor, transition }) {
	return (
		<HomeStyled>
			<SvgWord
				color={contrastColor}
				side="bottom"
				name="SKILLS"
				transition={transition}
			/>
			<SvgWord
				color={contrastColor}
				side="left"
				name="ABOUT"
				transition={transition}
			/>
			<SvgWord
				color={contrastColor}
				side="right"
				name="WORK"
				transition={transition}
			/>
		</HomeStyled>
	);
}
