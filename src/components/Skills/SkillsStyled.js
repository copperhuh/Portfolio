import styled from "styled-components";

const SkillsStyled = styled.div`
	position: relative;
	height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	@media (max-width: 650px) {
		z-index: 2;
	}

	.title {
		padding: 1rem;
		grid-column: 7/31;
		grid-row: 1/4;
		z-index: 3;
		width: 90%;
		height: 93%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
			overflow: visible;
		}
		.letter-container {
			width: 8.7rem;
			height: 100%;
		}
		@media (max-width: 1450px) {
			grid-row: 2/5;
		}
		@media (max-width: 1110px) {
			grid-column: 5/31;
		}
		@media (max-width: 1079px) {
			width: 100%;
			grid-column: 1/31;
			grid-row: 2/4;
		}
		@media (max-width: 850px) {
			padding: 0;
			height: 100%;
			grid-column: 1/31;
			left: 50%;
			transform: translateX(-50%);
			.letter-container {
				width: auto;
				margin: 0 0.2rem;
			}
		}
		@media (max-width: 750px) {
			height: 80%;
		}
		@media (max-width: 650px) {
			height: 50%;
			grid-row: 2/5;
		}
		@media (max-width: 600px) {
			height: 40%;
		}
		@media (max-width: 440px) {
			height: 30%;
		}
		@media (max-width: 400px) {
			height: 40%;
			grid-row: 2/4;
		}
		@media (max-width: 360px) {
			height: 30%;
		}
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 12/27;
		grid-row: 6/17;
		transition: transform 0.4s;
		position: relative;
		@media (max-width: 1700px) {
			grid-column: 11/27;
		}
		@media (max-width: 1530px) {
			grid-column: 10/27;
		}
		@media (max-width: 1450px) {
			grid-row: 7/18;
			grid-column: 10/28;
		}
		@media (max-width: 1365px) {
			grid-column: 10/29;
		}
		@media (max-width: 1290px) {
			grid-row: 7/18;
			grid-column: 10/29;
		}
		@media (max-width: 1245px) {
			grid-column: 10/30;
		}

		@media (max-width: 1110px) {
			grid-row: 7/17;
			grid-column: 7/30;
		}
		@media (max-width: 1079px) {
			grid-row: 6/19;
			grid-column: 9/27;
		}
		@media (max-width: 950px) {
			grid-row: 6/19;
			grid-column: 8/28;
		}
		@media (max-width: 800px) {
			grid-row: 6/19;
			grid-column: 7/29;
		}
		@media (max-width: 650px) {
			grid-column: 3/29;
		}
		@media (max-width: 500px) {
			grid-row: 5/20;
			grid-column: 2/30;
		}
	}
	.projects-container-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
		position: relative;
		justify-content: space-between;
		color: ${(props) => props.colors.contrastColor};
		.text {
			height: 100%;
			width: 53%;
			padding: 2rem 1rem 2rem 3rem;
			line-height: 1.6;
			box-sizing: border-box;
			p {
				font-size: 1.078rem;
				span {
					color: ${(props) => props.colors.mainColor};
					display: inline-block;
				}
				@media (max-width: 1185px) {
					font-size: 1rem;
				}
			}
		}
		.icon-container {
			height: 100%;
			width: 47%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			box-sizing: border-box;
			.subtitle {
				width: 100%;
				height: 16%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 1.7rem;
				padding-bottom: 0.7rem;
				padding-right: 1.2rem;
				box-sizing: border-box;
				color: ${(props) => props.colors.mainColor};
				text-transform: uppercase;
				letter-spacing: 0.07rem;
				.subtitle-text {
					background: ${(props) => props.colors.contrastColor};
					padding: 0.2rem 0.5rem 0.2rem 6rem;
					margin-right: -0.7rem;
				}
			}
			.icon {
				height: 28%;
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				i {
					color: ${(props) => props.colors.contrastColor};
					font-size: 2.6rem;
					padding: 0.7rem 0.6rem 0.5rem;
					background: ${(props) => props.colors.mainColor};
				}
				.icon-name {
					padding: 0.7rem 0 0;
					font-weight: 600;
					font-size: 0.8rem;
				}
				@media (max-width: 400px) {
					width: 33.3%;
					height: 21%;
				}
				@media (max-width: 300px) {
					i {
						font-size: 2rem;
						padding: 0.7rem;
					}
					.icon-name {
						font-size: 0.7rem;
					}
				}
			}
		}
		::after {
			position: absolute;
			content: "";
			top: 0;
			left: 0;
			width: 100%;
			height: 0.35rem;
			background: ${(props) => props.colors.mainColor};
		}
		@media (max-width: 1079px) {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 1rem 1rem 2.5rem 1rem;
			.text {
				padding: 2rem 1rem 2rem 1.5rem;
			}
			.text,
			.icon-container {
				width: 100%;
				padding-bottom: 3rem;
				.icon {
					padding: 0.5rem 0;
				}
				.subtitle {
					.subtitle-text {
						padding: 0.2rem 0.5rem 0.2rem 10rem;
					}
					padding-bottom: 2rem;
				}
			}
		}
		@media (max-width: 450px) {
			padding: 1rem 0.2rem 2.5rem 0.2rem;
		}
		@media (max-width: 550px) {
			.icon-container .subtitle .subtitle-text {
				padding: 0.2rem 0.5rem 0.2rem 6rem;
			}
		}
		@media (max-width: 400px) {
			.icon-container .subtitle {
				.subtitle-text {
					padding: 0.2rem 0.5rem 0.2rem 2rem;
					margin-right: -0.9rem;
				}
			}
		}
	}

	.left-section,
	.bottom-section,
	.right-section {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 4;
		@media (max-width: 1450px) {
			display: none;
		}
	}

	.left-section {
		grid-column: 1/5;
		grid-row: 1/21;
	}
	.bottom-section {
		grid-column: 1/31;
		grid-row: 17/21;
	}
	.right-section {
		grid-column: 24/31;
		grid-row: 1/21;
	}

	.left-svg-word,
	.right-svg-word,
	.bottom-svg-word {
		position: absolute;
		height: 70%;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
		z-index: 2;
		width: 200px;
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
			margin: 1rem 0;
			height: 20%;
		}
	}
	.right-svg-word {
		left: auto;
		right: 1rem;
	}

	.bottom-svg-word {
		height: 70%;
		top: auto;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.letter-container {
			width: 9.5%;
			height: 100%;
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
		flex-direction: row;
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
		flex-direction: column;
	}
	.arrow-right {
		transform: rotate(180deg);
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

export default SkillsStyled;
