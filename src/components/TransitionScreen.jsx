import { height } from "@mui/system";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../themes";

export default function TransitionScreen({ currentIdx, setOpenExt, text }) {
	const [open, setOpen] = useState(false);
	const [rest, setRest] = useState(false);
	const [wordsShown, setWordsShown] = useState(new Array(35).fill(false));
	const { width } = useSpring({
		width: open ? "100%" : "0%",
		config: { mass: 1, tension: 100, friction: 10, clamp: true },
		onRest: () => setRest(true),
	});
	useEffect(() => {
		setOpen(true);
	}, []);
	useEffect(() => {
		const showWords = () => {
			const INTERVAL = 11;
			let time = 0;
			for (let i = 0; i < wordsShown.length; i++) {
				time += INTERVAL;
				setTimeout(() => {
					setWordsShown((prev) => [
						...prev.slice(0, i),
						true,
						...prev.slice(i + 1),
					]);
				}, time);
			}
			for (let i = wordsShown.length - 1; i >= 0; i--) {
				time += INTERVAL;
				setTimeout(() => {
					setWordsShown((prev) => [
						...prev.slice(0, i),
						false,
						...prev.slice(i + 1),
					]);
				}, time);
			}
			setTimeout(() => {
				setOpen(false);
				setRest(false);
			}, time);
		};
		if (rest && open) showWords();
		if (rest && !open) setOpenExt(false);
	}, [rest]);
	const words = wordsShown.map((word, idx) => {
		return word ? (
			<div
				key={idx}
				style={{
					left: `${
						50 +
						idx * 0.3 -
						(wordsShown.filter((w) => w).length / 4) * 0.5
					}%`,
					top: `${
						50 -
						idx * 0.3 +
						(wordsShown.filter((w) => w).length / 4) * 0.5
					}%`,
				}}
				className={`word ${idx % 2 === 0 ? "main" : "secondary"}`}
			>
				{text}
			</div>
		) : null;
	});

	words.push(
		<div
			key={999}
			style={{
				left: `${
					50 +
					wordsShown.filter((w) => w).length * 0.3 -
					(wordsShown.filter((w) => w).length / 4) * 0.5
				}%`,
				top: `${
					50 -
					wordsShown.filter((w) => w).length * 0.3 +
					(wordsShown.filter((w) => w).length / 4) * 0.5
				}%`,
			}}
			className={`word secondary}`}
		>
			{text}
		</div>
	);
	const N = 26;
	const curtains = new Array(N).fill(null).map((_, idx) => {
		return (
			<animated.div
				key={idx}
				style={{ width: width, height: `${100 / N}%` }}
				className={`curtain ${
					idx % 2 === 0 ? "left-curtain" : "right-curtain"
				}`}
			></animated.div>
		);
	});
	curtains.push(
		<animated.div
			key={N}
			style={{ width: width, height: `${100 / N}%` }}
			className={`curtain left-curtain`}
		></animated.div>
	);

	return (
		<TransitionScreenStyled currentIdx={currentIdx}>
			{curtains}
			{words.filter((w) => w).length > 1 && words}
		</TransitionScreenStyled>
	);
}
// console.log(curtains);
const TransitionScreenStyled = styled.div`
	z-index: 100;
	display: flex;
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	flex-direction: column;
	.curtain {
		background-color: #68ab8e;
		background-color: ${(props) => colors[props.currentIdx].mainColor};
	}
	.right-curtain {
		background-color: #454a47;
		background-color: ${(props) => colors[props.currentIdx].secondaryColor};
		align-self: flex-end;
	}
	.word-container {
		width: fit-content;
		height: fit-content;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
	}
	.word {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		font-size: 20rem;
		font-family: "Vollkorn";
		font-weight: 900;
		color: #454a47;
		color: ${(props) => colors[props.currentIdx].mainColor};
		@media (max-width: 1700px) {
			font-size: 19rem;
		}
		@media (max-width: 1600px) {
			font-size: 18rem;
		}
		@media (max-width: 1500px) {
			font-size: 16rem;
		}
		@media (max-width: 1400px) {
			font-size: 15rem;
		}
		@media (max-width: 1300px) {
			font-size: 14rem;
		}
		@media (max-width: 1200px) {
			font-size: 13rem;
		}
		@media (max-width: 1100px) {
			font-size: 12rem;
		}
		@media (max-width: 1000px) {
			font-size: 11rem;
		}
		@media (max-width: 900px) {
			font-size: 9.5rem;
		}
		@media (max-width: 800px) {
			font-size: 8.5rem;
		}
		@media (max-width: 700px) {
			font-size: 7.5rem;
		}
		@media (max-width: 650px) {
			font-size: 6.5rem;
		}
		@media (max-width: 600px) {
			font-size: 6rem;
		}
		@media (max-width: 550px) {
			font-size: 5.5rem;
		}
		@media (max-width: 500px) {
			font-size: 5rem;
		}
		@media (max-width: 450px) {
			font-size: 4.5rem;
		}
		@media (max-width: 400px) {
			font-size: 4rem;
		}
		@media (max-width: 350px) {
			font-size: 3.5rem;
		}
		@media (max-width: 300px) {
			font-size: 3rem;
		}
	}

	.main {
		color: #68ab8e;
		color: ${(props) => colors[props.currentIdx].secondaryColor};
	}
`;
