import styled from "styled-components";

const HomeStyled = styled.div`
	position: relative;
	height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	.left-section,
	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.left-section {
		grid-column: 1/7;
		grid-row: 1/21;
	}
	.bottom-section {
		grid-column: 1/31;
		grid-row: 15/21;
	}
	.right-section {
		grid-column: 24/31;
		grid-row: 1/21;
	}

	.left-svg-word,
	.right-svg-word,
	.bottom-svg-word {
		position: absolute;
		height: 100%;
		left: 2rem;
		z-index: 2;
		width: 240px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
			overflow: visible;
		}
		.letter-container {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: calc(85% / 5);
		}
	}
	.left-svg-word {
		@media (max-width: 1250px) {
			width: 200px;
		}
	}
	.right-svg-word {
		width: 350px;
		left: auto;
		right: 2rem;
		.letter-container {
			width: 100%;
			height: 20%;
		}
		@media (max-width: 1250px) {
			width: 250px;
		}
	}
	.bottom-svg-word {
		height: 160px;
		top: auto;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.letter-container {
			width: 11%;
			@media (max-width: 1650px) {
				width: 12%;
			}
			@media (max-width: 1550px) {
				width: 13%;
			}
			@media (max-width: 1450px) {
				width: 14%;
			}
			@media (max-width: 1350px) {
				width: 15%;
			}
			@media (max-width: 1250px) {
				width: 16.5%;
				height: 90%;
			}
			height: 100%;
		}
	}

	.left-section,
	.bottom-section,
	.right-section {
		@media (max-width: 1000px) {
			display: none;
		}
	}

	.arrow-container {
		z-index: 1;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.arrow {
		width: 100px;
		height: 100px;
		svg {
			max-height: 100%;
			max-width: 100%;
		}
	}

	.bottom {
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		flex-direction: column-reverse;
	}
	.left {
		left: 30px;
		top: 45%;
		transform: translateY(-50%);
	}
	.arrow-left {
		transform: rotate(90deg);
	}
	.right {
		right: 30px;
		top: 45%;
		transform: translateY(-50%);
		flex-direction: row-reverse;
	}
	.arrow-right {
		transform: rotate(-90deg);
	}

	.arrow-text {
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem;
		margin: 0.6rem;
		font-family: "BIZ UDPMincho", serif;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
	}
`;

export default HomeStyled;
