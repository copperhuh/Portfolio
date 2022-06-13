import styled from "styled-components";
import { colors } from "../../themes";

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

export default TransitionScreenStyled;
