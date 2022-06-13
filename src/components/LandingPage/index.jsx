import React, { useEffect, useState } from "react";
import LandingStyled from "./LandingStyled";

export default function LandingPage({ cameraControls, setFade, setMoveSkull }) {
	useEffect(() => {
		cameraControls.current.setLookAt(2, 3, 6, 0, 1, 0, false);
		cameraControls.current.zoomTo(50, false);
	}, []);
	const [reverseFlag, setReverseFlag] = useState(false);

	const fadeOut = (e) => {
		if (reverseFlag) {
			setN(n - 1);
		}
	};

	const [n, setN] = useState(0);
	useEffect(() => {
		setTimeout(async () => {
			if (reverseFlag) {
				if (n === 0) {
					setTimeout(async () => {
						setFade(true);
						setMoveSkull(true);
						await cameraControls.current.zoomTo(1, true);
						await cameraControls.current.setLookAt(
							2,
							2,
							6,
							0,
							0,
							0,
							true
						);
					}, 300);
					return;
				}
				setN(n - 1);
			} else {
				if (n === h2.length + 2 + h3.length) {
					setReverseFlag(true);
				} else {
					setN(n + 1);
				}
			}
		}, 50);
	}, [n]);

	const h2 = "Jakub Koper".split("");
	const h3 = "Front End Developer".split("");
	return (
		<LandingStyled onClick={fadeOut}>
			<h2>{h2.slice(0, n)}</h2>
			<h3>{h3.slice(0, n >= h2.length + 2 ? n - (h2.length + 2) : 0)}</h3>
			<div onClick={fadeOut} className="event-catcher"></div>
		</LandingStyled>
	);
}
