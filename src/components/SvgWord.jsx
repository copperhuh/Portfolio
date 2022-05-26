import Arrow from "./Arrow";
import { animated, useSpring } from "@react-spring/web";
import Letter from "./Letter";
import svgLetterData from "../svgLetterData";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SvgWord({ color, side, name, transition }) {
	const [toggle, setToggle] = useState(false);
	const [toggleOpacityAll, setToggleOpacityAll] = useState(false);
	const [currentColor, setCurrentColor] = useState(color);

	useEffect(() => {
		setToggleOpacityAll(true);
	}, [color]);

	const { opacity } = useSpring({
		opacity: toggle ? 0 : 1,
		config: { duration: 300 },
	});

	const { opacityAll } = useSpring({
		opacityAll: toggleOpacityAll ? 0 : 1,
		config: { duration: 300 },
		onRest: () => {
			if (toggleOpacityAll) {
				setCurrentColor(color);
				setToggleOpacityAll(false);
			}
		},
	});

	const letters = name
		? name.split("").map((letter, idx) => {
				return (
					<div key={idx} className="letter-container">
						<Letter
							stroke={currentColor}
							{...svgLetterData[letter.toLowerCase()]}
							toggle={toggle}
						/>
					</div>
				);
		  })
		: null;

	return (
		<animated.div
			style={{ opacity: opacityAll }}
			className={`${side}-section`}
			onMouseEnter={() => setToggle(true)}
			onMouseLeave={() => setToggle(false)}
			onClick={() => transition(name)}
		>
			<WordStyled color={currentColor} style={{ opacity: opacityAll }}>
				<animated.div
					className={`${side} arrow-container`}
					style={{
						opacity: opacity,
					}}
				>
					<div className={`arrow arrow-${side}`}>
						<Arrow start={Math.floor(Math.random() * 5)} />
					</div>
					<div className="arrow-text">{name}</div>
				</animated.div>
				<div className={`${side}-svg-word`}>{letters}</div>
			</WordStyled>
		</animated.div>
	);
}

const WordStyled = styled.div`
	.arrow svg {
		fill: ${(props) => props.color};
	}
	.arrow-text {
		color: ${(props) => props.color};
	}
`;
