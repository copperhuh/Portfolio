import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";

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
						strokeWidth="1.7"
						d={path}
					/>
				</g>
			</svg>
		</>
	);
}
