import styled from "styled-components";

const LoadingStyled = styled.div`
	height: 100vh;
	width: 100vw;
	background: blue;
	z-index: 3;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	background: ${(props) =>
		props.fade ? "none" : "radial-gradient(#171a18, #171a18)"};
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		width: 350px;
		height: 350px;
		border-radius: 100%;
		background: linear-gradient(
			165deg,
			rgba(110, 174, 147, 1) 0%,
			rgb(75, 139, 112) 40%,
			rgb(25, 89, 62) 98%,
			rgb(10, 10, 10) 100%
		);
		position: relative;
		.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			font-family: "Montserrat", sans-serif;
			text-transform: uppercase;
			font-size: 1rem;
			color: #d2d1c9;
			letter-spacing: 2px;
		}
		animation: ${(props) =>
			props.expand ? "none" : "2s scale ease-in-out infinite"};
	}

	.loader:before {
		position: absolute;
		content: "";
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border-bottom: 0 solid #4b8b7005;
		box-shadow: 0 -10px 20px 20px #4b8b7040 inset,
			0 -5px 15px 10px #4b8b7050 inset, 0 -2px 5px #4b8b7080 inset,
			0 -3px 2px #4b8b70bb inset, 0 2px 0px #4b8b70, 0 2px 3px #4b8b70,
			0 5px 5px #4b8b7090, 0 10px 15px #4b8b7060,
			0 10px 20px 20px #4b8b7040;
		filter: blur(3px);
		animation: 2s rotate linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes scale {
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
`;

export default LoadingStyled;
