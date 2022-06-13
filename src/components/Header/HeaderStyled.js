import styled from "styled-components";

const HeaderStyled = styled.div`
	width: 100vw;
	font-family: "BIZ UDPMincho", serif;
	font-size: 0.75rem;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	color: ${(props) => props.color};
	letter-spacing: 0.1rem;
	box-sizing: border-box;
	.container {
		padding: 1rem 2rem;
		box-sizing: border-box;
		background: ${(props) =>
			props.width < 1080
				? `linear-gradient(120deg,${props.secondaryColor + "a0"},${
						props.bgColor + "a0"
				  })`
				: "none"};
		height: 100%;
		width: 100%;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		@media (max-width: 440px) {
			padding: 1rem;
		}
	}
	.right {
		> * {
			padding: 0 0.35rem;
			user-select: none;
			z-index: 1;
		}
		.MuiSvgIcon-root {
			padding: 0 0.2rem;
			font-size: 1.2rem;
			transition: 0.2s;
			transform: scale(1);
			:hover {
				transition: 0.2s;
				transform: scale(1.2);
			}
		}
		display: flex;
		justify-content: center;
		align-items: center;
		@media (max-width: 700px) {
			flex-wrap: wrap-reverse;
			justify-content: end;
			width: 70%;
			.break {
				margin-left: 15rem;
			}
		}
		@media (max-width: 660px) {
			.break {
				margin-left: 13rem;
			}
		}
		@media (max-width: 610px) {
			.break {
				margin-left: 11rem;
			}
		}
		@media (max-width: 565px) {
			.break {
				margin-left: 7rem;
			}
		}
		@media (max-width: 480px) {
			.break {
				margin-left: 3rem;
			}
		}
		@media (max-width: 410px) {
			width: auto;
			.break {
				margin-left: 1rem;
			}
		}
	}
	.left {
		z-index: 1;
		user-select: none;
		@media (max-width: 410px) {
			text-align: center;
			line-height: 1.6;
		}
	}
	.link {
		position: relative;
		padding: 1rem 0;
		display: block;
		:after {
			position: absolute;
			content: "";
			height: 1px;
			bottom: 10px;
			transition: 0.2s;
			margin: 0 auto;
			left: 0;
			right: 0;
			width: 0%;
			background: ${(props) => props.color};
		}

		:hover:after {
			width: 100%;
		}
	}
	.active:after {
		position: absolute;
		content: "";
		height: 1px;
		bottom: 10px;
		transition: 0.2s;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 100%;
		background: ${(props) => props.color};
	}
`;

export default HeaderStyled;
