import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Letter({
	stroke,
	toggle,
	path,
	transform,
	height,
	width,
	viewBox,
	button = true,
}) {
	const windowWidth = useWindowWidth();
	const [localStroke, setLocalStroke] = useState(stroke);
	useEffect(() => {
		if (button && toggle) setLocalStroke(stroke);
	}, [toggle]);
	const [length, setLength] = useState(null);
	const animatedStyle = useSpring({
		strokeDasharray: length,
		strokeDashoffset: toggle && stroke === localStroke ? 0 : length,
		config: { duration: 500 },
		onRest: () => setLocalStroke(stroke),
	});

	let strokeWidth = 1.7;
	if (windowWidth < 350) {
		strokeWidth = 5.5;
	} else if (windowWidth < 400) {
		strokeWidth = 4.7;
	} else if (windowWidth < 500) {
		strokeWidth = 4;
	} else if (windowWidth < 600) {
		strokeWidth = 3.2;
	} else if (windowWidth < 700) {
		strokeWidth = 2.5;
	}
	return (
		<>
			<svg width={width} height={height} viewBox={viewBox}>
				<g transform={transform}>
					<animated.path
						style={animatedStyle}
						ref={(ref) => {
							if (ref) {
								setLength(ref.getTotalLength());
							}
						}}
						stroke={localStroke}
						strokeWidth={strokeWidth}
						d={path}
					/>
				</g>
			</svg>
		</>
	);
}
