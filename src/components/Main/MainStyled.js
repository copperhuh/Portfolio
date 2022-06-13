import styled from "styled-components";

const MainStyled = styled.div`
	height: 100vh;
	max-height: 100vh;
	width: 100vw;
	max-width: 100vw;
	* > {
		box-sizing: border-box;
	}
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	.content {
		margin-top: 4.75rem;
		flex: 1;
		@media (max-width: 700px) {
			margin-top: 7.5rem;
		}
	}
`;

export default MainStyled;
