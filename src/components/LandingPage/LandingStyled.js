import styled from "styled-components";

const LandingStyled = styled.div`
	position: absolute;
	z-index: 4;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	font-family: "Montserrat", sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #d2d1c9;
	.event-catcher {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
	}
	h2,
	h3 {
		letter-spacing: 1px;
		font-weight: 500;
		margin: 1.2rem;
		background: #d2d1c9;
		background: #212523;
		padding: 0rem 0.5rem;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.7rem;
		@media (max-width: 370px) {
			font-size: 1.5rem;
		}
		@media (max-width: 330px) {
			font-size: 1.3rem;
		}
	}
`;

export default LandingStyled;
