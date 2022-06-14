import styled from "styled-components";

const WorkStyled = styled.div`
	position: relative;
	height: 100%;
	max-height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	@media (max-width: 650px) {
		z-index: 2;
	}

	.left-section,
	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.title {
		padding: 1rem 0;
		grid-column: 3/26;
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
			width: 11.8rem;
			height: 100%;
		}
		@media (max-width: 1450px) {
			grid-row: 2/5;
		}
		@media (max-width: 1150px) {
			grid-column: 3/27;
		}
		@media (max-width: 1079px) {
			height: 100%;
			grid-column: 1/31;
			grid-row: 1/3;
			left: 50%;
			transform: translateX(-50%);
			.letter-container {
				width: auto;
				margin: 0 0.2rem;
			}
		}
		@media (max-width: 400px) {
			grid-row: 1/2;
		}
	}

	.projects-container-back,
	.projects-container-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 6/20;
		grid-row: 7/17;
		transition: transform 0.4s;
		position: relative;
		@media (max-width: 1700px) {
			grid-column: 6/21;
			grid-row: 7/17;
		}
		@media (max-width: 1630px) {
			grid-column: 6/22;
		}
		@media (max-width: 1530px) {
			grid-column: 5/22;
		}
		@media (max-width: 1450px) {
			grid-column: 3/22;
			grid-row: 8/18;
		}
		@media (max-width: 1250px) {
			grid-column: 3/23;
			grid-row: 8/18;
		}
		@media (max-width: 1150px) {
			grid-column: 3/24;
			grid-row: 8/18;
		}
	}
	.projects-container-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
		position: relative;
		justify-content: space-between;
		padding: 0 0 0 1.4rem;
		color: ${(props) => props.colors.contrastColor};
		text-align: left;
		.btn {
			position: absolute;
			bottom: -16%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.5rem;
			height: 2.5rem;
			border: none;
			background: ${(props) => props.colors.contrastColor};
			color: ${(props) => props.colors.secondaryColor};
			transition: all 0.15s;
		}
		.next-project {
			right: 0;
			top: 50%;
			transform: translateX(150%);
			:hover {
				transform: translateY(-10%) translateX(150%);
			}
			:disabled {
				background: ${(props) => props.colors.contrastColor + "50"};
				color: ${(props) => props.colors.secondaryColor + "50"};
				transform: translateX(150%);
			}
		}
		.prev-project {
			left: 0;
			top: 50%;
			transform: translateX(-150%);
			:hover {
				transform: translateY(-10%) translateX(-150%);
			}
			:disabled {
				background: ${(props) => props.colors.contrastColor + "50"};
				color: ${(props) => props.colors.secondaryColor + "50"};
				transform: translateX(-150%);
			}
		}
		.flex {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: start;
			width: 25%;
			padding: 1rem 0;
			box-sizing: border-box;
			order: -1;
		}

		.project-subtitle {
			font-size: 0.75rem;
			margin: 0.7rem 0 0;
			color: ${(props) => props.colors.mainColor};
		}
		.project-title {
			margin: 0 0 0;
			font-size: 1.6rem;
			font-weight: 400;
			letter-spacing: 0.1rem;
		}
		.techs {
			margin: 0.5rem 0;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: 0.75rem;
			justify-content: start;
			.tech {
				margin: 0.2rem 0.5rem;
			}
		}
		.description {
			color: white;
			font-size: 1rem;
			letter-spacing: 0.1rem;
			color: ${(props) => props.colors.secondaryColor};
			background: ${(props) => props.colors.contrastColor};
			width: 22rem;
			z-index: 1;
			padding: 1rem;
			text-align: left;
			@media (max-width: 500px) {
				width: 100%;
				box-sizing: border-box;
			}
		}
		.screenshot {
			order: 2;
			width: 70%;
			background: ${(props) => `url(${props.url}) no-repeat`};
			background-color: #151515;
			background-size: contain;
			background-position: center;
			position: relative;
			::after {
				position: absolute;
				content: "";
				width: 100%;
				height: 100%;
				background: ${(props) => props.colors.mainColor + "50"};
				top: 0;
				left: 0;
				opacity: 1;
				transition: all 0.4s;
			}
			:hover::after {
				opacity: 0;
			}
		}
		.links {
			a {
				color: ${(props) => props.colors.contrastColor};
				padding: 0.3rem;
				transition: color 0.3s;
				:hover {
					color: ${(props) => props.colors.mainColor};
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
		@media (max-width: 850px) {
			.flex {
				width: 100%;
				z-index: 2;
			}
			.screenshot {
				display: none;
			}
			::before {
				content: "";
				position: absolute;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;
				opacity: 0.2;
			}
		}
	}
	.projects-container-main--uneven {
		padding: 0 1.4rem 0 0;
		text-align: right;
		.flex {
			align-items: flex-end;
			order: 3;
		}
		.techs {
			justify-content: flex-end;
		}
		.description {
			text-align: right;
		}
	}

	.projects-container-main--0,
	.projects-container-back--0,
	.projects-container-main--1,
	.projects-container-back--1,
	.projects-container-main--2,
	.projects-container-back--2,
	.projects-container-main--3,
	.projects-container-back--3 {
		grid-column: 3/28;
		@media (max-width: 500px) {
			box-sizing: border-box;
			padding: 0 0.8rem;
		}
		@media (max-width: 650px) {
			grid-column: 2/30;
		}
	}

	.projects-container-main--0,
	.projects-container-back--0 {
		grid-row: 4/7;
		@media (max-width: 400px) {
			grid-row: 3/6;
		}
	}
	.projects-container-main--0 {
		.screenshot {
			background: ${(props) => `url(${props.images[0]}) no-repeat`};
			background-color: #151515;
			background-size: contain;
			background-position: center;
		}
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[0]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--1,
	.projects-container-back--1 {
		grid-row: 8/11;
		@media (max-width: 400px) {
			grid-row: 7/10;
		}
	}
	.projects-container-main--1 {
		.screenshot {
			background: ${(props) => `url(${props.images[1]}) no-repeat`};
			background-color: #151515;
			background-size: contain;
			background-position: center;
		}
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[1]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--2,
	.projects-container-back--2 {
		grid-row: 12/15;
		@media (max-width: 400px) {
			grid-row: 11/14;
		}
	}
	.projects-container-main--2 {
		.screenshot {
			background: ${(props) => `url(${props.images[2]}) no-repeat`};
			background-color: #151515;
			background-size: contain;
			background-position: center;
		}
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[2]}) no-repeat`};
				background-size: cover;
			}
		}
	}
	.projects-container-main--3,
	.projects-container-back--3 {
		grid-row: 16/19;
		@media (max-width: 400px) {
			grid-row: 15/18;
		}
	}
	.projects-container-main--3 {
		.screenshot {
			background: ${(props) => `url(${props.images[3]}) no-repeat`};
			background-color: #151515;
			background-size: contain;
			background-position: center;
		}
		@media (max-width: 850px) {
			::before {
				background: ${(props) => `url(${props.images[3]}) no-repeat`};
				background-size: cover;
			}
		}
	}

	.bottom-section,
	.right-section,
	.left-section {
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
		width: 220px;
		left: auto;
		right: 2rem;
		.letter-container {
			width: 100%;
			height: calc(85% / 5);
		}
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
		flex-direction: column;
	}
	.arrow-left {
		transform: rotate(90deg);
	}
	.right {
		right: 30px;
		top: 45%;
		transform: translateY(-50%);
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

export default WorkStyled;
