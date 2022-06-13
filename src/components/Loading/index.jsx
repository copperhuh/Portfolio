import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import LoadingStyled from "./LoadingStyled";

export default function Loading({ setLoaded }) {
	useEffect(() => {
		return () => setTimeout(() => setLoaded(true), 100);
	}, []);
	return;
}
export function LoadingScreen({ setLoadScreenOpen, loaded, setLandingOpen }) {
	const [expand, setExpand] = useState(false);
	const [fade, setFade] = useState(false);
	const { textOpacity } = useSpring({
		textOpacity: loaded ? 0 : 1,
		onRest: () => {
			if (loaded) {
				setExpand(true);
				setLandingOpen(true);
			}
		},
	});
	const { orbWidth, orbHeight, orbBorderRadius } = useSpring({
		orbWidth: expand ? document.body.clientWidth * 1.5 + "px" : "350px",
		orbHeight: expand ? document.body.clientHeight * 1.5 + "px" : "350px",
		orbBorderRadius: expand ? "0%" : "100%",
		onRest: () => (expand ? setFade(true) : null),
	});
	const { opacityAll } = useSpring({
		opacityAll: fade ? 0 : 1,
		config: { duration: 800 },
		onRest: () => (fade ? setLoadScreenOpen(false) : null),
	});

	return (
		<LoadingStyled expand={expand} fade={fade}>
			<animated.div
				style={{
					width: orbWidth,
					height: orbHeight,
					borderRadius: orbBorderRadius,
					opacity: opacityAll,
				}}
				className="container"
			>
				<div
					style={{ display: expand ? "none" : "block" }}
					className="loader"
				></div>
				<animated.div style={{ opacity: textOpacity }} className="text">
					Loading...
				</animated.div>
			</animated.div>
		</LoadingStyled>
	);
}
