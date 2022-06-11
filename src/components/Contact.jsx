import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import svgLetterData from "../svgLetterData";
import Letter from "./Letter";
import SvgWord from "./SvgWord";
import TextField from "@mui/material/TextField";
import axios from "axios";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Contact({
	prevSection,
	contrastColor,
	transition,
	colors,
	currentIdx,
}) {
	const windowWidth = useWindowWidth();
	const [action, setAction] = useState(null);
	useEffect(() => {
		setTimeout(() => {
			setContainerBlur(true);
			setAction("waiting");
		}, 1000);
	}, []);

	const [localIdx, setLocalIdx] = useState(currentIdx);
	useEffect(() => {
		if (action) {
			setObscure(true);
			setContainerBlur(false);
			setAction("changeTheme");
		}
	}, [currentIdx]);

	const [containerBlur, setContainerBlur] = useState(false);
	const [obscured, setObscured] = useState(false);
	const [obscure, setObscure] = useState(false);
	const [obscureBorder, setObscureBorder] = useState(false);
	const [obscureSide, setObscureSide] = useState(true);

	const { obscureSize } = useSpring({
		obscureSize: obscure ? "100%" : "0%",
		config: { duration: 200 },
		onRest: () => {
			if (obscure) {
				setObscureBorder(true);
			} else {
				setObscureSide(true);
				setAction("waiting");
			}
		},
	});

	const { obscureBorderSize } = useSpring({
		obscureBorderSize: obscureBorder ? "0%" : "100%",
		config: { duration: 200 },
		onRest: () => {
			if (obscureBorder) setObscured(true);
			if (!obscureBorder) setObscure(false);
		},
	});

	useEffect(() => {
		if (obscured) {
			if (action === "changeTheme") {
				setLocalIdx(currentIdx);
			} else if (action === "showMessageSentScreen") {
				setSend("sent");
			} else if (action === "showErrorScreen") {
				setSend("error");
			}
			setObscureBorder(false);
			setObscureSide(false);
			setObscured(false);
			setContainerBlur(true);
		}
	}, [obscured]);

	const containerBg = new Array(7).fill(null).map((_, i) => {
		return (
			<div
				key={i}
				className="contact-container-back"
				style={{
					transform:
						containerBlur && windowWidth > 650
							? `translateX(${-i * 1.2}%) translateY(${
									7 - i * 1.5
							  }%)`
							: null,
				}}
			></div>
		);
	});

	const side = new Array(7).fill(null).map((_, i) => {
		return (
			<div
				key={i}
				className="contact-side-back"
				style={{
					transform:
						containerBlur && windowWidth > 650
							? `translateX(${-i * 1.2}%) translateY(${
									7 - i * 1.5
							  }%)`
							: null,
				}}
			></div>
		);
	});

	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		topic: "",
		message: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		topic: "",
		message: "",
	});

	const [send, setSend] = useState(false);

	useEffect(() => {
		if (send === "sending") {
			axios
				.post(
					"https://getform.io/f/adf00380-8cf8-4e61-8dd6-81c11af0d598",
					formValues,
					{ headers: { Accept: "application/json" } }
				)
				.then(() => {
					setObscure(true);
					setContainerBlur(false);
					setAction("showMessageSentScreen");
					setFormValues({
						name: "",
						email: "",
						topic: "",
						message: "",
					});
				})
				.catch(() => {
					setObscure(true);
					setContainerBlur(false);
					setAction("showErrorScreen");
					setFormValues({
						name: "",
						email: "",
						topic: "",
						message: "",
					});
				});
		}
	}, [send]);

	const validate = (field, value) => {
		if (field === "name") {
			if (value === "") {
				errors.name = "Name is Required";
			} else if (
				!/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
					value.trim()
				)
			) {
				errors.name = "Invalid Name";
			} else {
				errors.name = "";
			}
		} else if (field === "email") {
			if (value === "") {
				errors.email = "Email is Required";
			} else if (
				!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value.trim()
				)
			) {
				errors.email = "Invalid Email";
			} else {
				errors.email = "";
			}
		} else if (field === "topic") {
			if (value === "") {
				errors.topic = "Topic is Required";
			} else {
				errors.topic = "";
			}
		} else if (field === "message") {
			if (value === "") {
				errors.message = "Message is Required";
			} else {
				errors.message = "";
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		validate("name", formValues.name);
		validate("email", formValues.email);
		validate("topic", formValues.topic);
		validate("message", formValues.message);

		if (errors.name || errors.email || errors.topic || errors.message) {
			setSend(true);
			return;
		}
		setSend("sending");
	};

	const handleChange = (e) => {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			[e.target.name]: e.target.value,
		}));
		if (send) {
			validate(e.target.name, e.target.value);
		}
	};

	containerBg.push(
		<div
			key={7}
			className="contact-container-main"
			style={{
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-7 * 1.2}%) translateY(${7 - 7 * 1.5}%)`
						: null,
			}}
		>
			{send === "sent" ? (
				<div className="message-sent-screen">
					<h2>Message Sent</h2>
					<h4>Thanks! I'll get back to you as soon as I can.</h4>
				</div>
			) : send === "error" ? (
				<div className="message-error-screen">
					<h2>Error</h2>
					<h4>Sorry, there seems to be something wrong.</h4>
					<h4>
						Please contact me at{" "}
						<span>jakub.koper@wpc-huh.com</span> instead.
					</h4>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="form-header">
						Feel free to message me if you have any questions or
						proposals, or just want to say hello!
					</div>
					<div className="personal-info">
						<div className="name">
							<TextField
								id="name-input"
								name="name"
								label="Name"
								type="text"
								fullWidth={true}
								error={!!errors.name}
								helperText={errors.name}
								inputProps={{ maxLength: 50, name: "name" }}
								value={formValues.name}
								onChange={handleChange}
							/>
						</div>
						<div className="email">
							<TextField
								id="email-input"
								name="email"
								label="Email"
								type="text"
								fullWidth={true}
								error={!!errors.email}
								helperText={errors.email}
								inputProps={{ maxLength: 30, name: "email" }}
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="topic">
						<TextField
							id="topic-input"
							name="topic"
							label="Topic"
							type="text"
							fullWidth={true}
							error={!!errors.topic}
							helperText={errors.topic}
							inputProps={{ maxLength: 150, name: "topic" }}
							value={formValues.topic}
							onChange={handleChange}
						/>
					</div>
					<div className="message">
						<TextField
							id="message-input"
							name="message"
							label="Message"
							type="text"
							fullWidth={true}
							error={!!errors.message}
							helperText={errors.message}
							multiline={true}
							minRows={9}
							maxRows={9}
							inputProps={{ maxLength: 1500, name: "message" }}
							value={formValues.message}
							onChange={handleChange}
						/>
					</div>
					<div className="submit-btn">
						<button
							disabled={
								errors.name ||
								errors.email ||
								errors.topic ||
								errors.message ||
								send === "sending"
							}
							type="submit"
						>
							{send === "sending" ? "SENDING . . ." : "SEND"}
						</button>
					</div>
				</form>
			)}
			<animated.div
				className="obscure"
				style={{
					width: obscureSize,
					height: obscureSize,
					borderTopLeftRadius: obscureSide ? 0 : obscureBorderSize,
					borderBottomRightRadius: obscureSide
						? obscureBorderSize
						: 0,
					position: "absolute",
					background: colors[currentIdx].mainColor,
					top: obscureSide ? 0 : "auto",
					bottom: obscureSide ? "auto" : 0,
					left: obscureSide ? 0 : "auto",
					right: obscureSide ? "auto" : 0,
					zIndex: 10,
				}}
			></animated.div>
		</div>
	);

	side.push(
		<div
			key={7}
			className="contact-side-main"
			style={{
				transform:
					containerBlur && windowWidth > 650
						? `translateX(${-7 * 1.2}%) translateY(${7 - 7 * 1.5}%)`
						: null,
			}}
		>
			<a
				href="https://github.com/copperhuh"
				target="_blank"
				className="link"
			>
				<GitHubIcon /> <div>Github</div>
			</a>
			<a href="" target="_blank" className="link">
				<LinkedInIcon /> <div>LinkedIn</div>
			</a>
			<a href="mailto: jakub.koper@wpc-huh.com" className="link">
				<EmailIcon /> <div>jakub.koper@wpc-huh.com</div>
			</a>
			<animated.div
				className="obscure"
				style={{
					width: obscureSize,
					height: obscureSize,
					borderTopLeftRadius: obscureSide ? 0 : obscureBorderSize,
					borderBottomRightRadius: obscureSide
						? obscureBorderSize
						: 0,
					position: "absolute",
					background: colors[currentIdx].mainColor,
					top: obscureSide ? 0 : "auto",
					bottom: obscureSide ? "auto" : 0,
					left: obscureSide ? 0 : "auto",
					right: obscureSide ? "auto" : 0,
					zIndex: 10,
				}}
			></animated.div>
		</div>
	);

	const letters = "CONTACT".split("").map((letter, idx) => {
		return (
			<div key={idx} className="letter-container">
				<Letter
					stroke={contrastColor}
					{...svgLetterData[letter.toLowerCase()]}
					toggle={action}
					button={false}
				/>
			</div>
		);
	});

	return (
		<ContactStyled
			wordLength={prevSection.length}
			colors={colors[localIdx]}
		>
			<SvgWord
				color={contrastColor}
				side="left"
				name={prevSection}
				transition={transition}
			/>
			<div className="title">{letters}</div>
			{containerBg}
			{side}
		</ContactStyled>
	);
}

const ContactStyled = styled.div`
	position: relative;
	height: 100%;
	display: grid;
	grid-template: repeat(20, 1fr) / repeat(30, 1fr);

	/* .title {
		padding: 1rem;
		grid-column: 5/20;
		grid-row: 1/4;
		z-index: 3;
		width: 100%;
		height: 93%;
		position: absolute;
		display: flex;
		svg {
			fill: none;
			max-height: 100%;
			max-width: 100%;
		}
		.letter-container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			flex: 1;
		}
	} */
	.title {
		/* background: #000; */
		padding: 1rem 0;
		grid-column: 1/29;
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
		@media (max-width: 1200px) {
			width: 100%;
		}
		@media (max-width: 1079px) {
			.letter-container {
				width: auto;
				margin: 0 0.2rem;
			}
			grid-column: 1/30;
			box-sizing: border-box;
			padding: 0 1rem;
			height: 100%;
		}
	}

	.contact-container-back,
	.contact-container-main,
	.contact-side-back,
	.contact-side-main {
		z-index: 3;
		background: ${(props) => props.colors.secondaryColor + "30"};
		width: 100%;
		height: 100%;
		grid-column: 7/20;
		grid-row: 6/20;
		transition: transform 0.4s;
		position: relative;
		@media (max-width: 1650px) {
			grid-column: 7/21;
		}
		@media (max-width: 1550px) {
			grid-column: 7/21;
		}
		@media (max-width: 1450px) {
			grid-column: 5/22;
		}
		@media (max-width: 1200px) {
			grid-column: 4/22;
		}
		@media (max-width: 1079px) {
			grid-column: 7/28;
			grid-row: 6/17;
		}
		@media (max-width: 950px) {
			grid-column: 6/29;
		}
		@media (max-width: 830px) {
			grid-column: 5/30;
		}
		@media (max-width: 730px) {
			grid-row: 5/15;
		}
		@media (max-width: 650px) {
			grid-column: 2/29;
			grid-row: 4/15;
		}
		@media (max-width: 375px) {
			grid-row: 4/15;
		}
	}
	.contact-container-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
		position: relative;
		justify-content: center;
		align-items: center;
		color: ${(props) => props.colors.contrastColor};
		.form-header {
			color: ${(props) => props.colors.secondaryColor};
			background: ${(props) => props.colors.contrastColor};
			width: 90%;
			align-self: flex-start;
			margin: -0.8rem 0 0 -1.4rem;
			padding: 0.5rem 10rem 0.5rem 1.5rem;
			line-height: 1.4;
			letter-spacing: 0.1px;
			font-size: 1.2rem;
			box-sizing: border-box;
			border-right: 0.6rem solid ${(props) => props.colors.mainColor};
			@media (max-width: 1200px) {
				font-size: 1.1rem;
			}
			@media (max-width: 800px) {
				width: 95%;
				padding-right: 6rem;
			}
			@media (max-width: 600px) {
				width: 95%;
				padding: 0.5rem 1rem;
			}
			@media (max-width: 500px) {
				width: 100%;
				font-size: 1rem;
				margin: 0;
			}
		}
		.message-sent-screen,
		.message-error-screen {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			h2 {
				font-size: 5rem;
				color: ${(props) => props.colors.mainColor};
				margin: 0;
				/* margin-top: -2rem; */
				@media (max-width: 730px) {
					font-size: 4rem;
					text-align: center;
				}
				@media (max-width: 570px) {
					font-size: 3rem;
				}
			}
			h4 {
				font-size: 1.2rem;
				text-align: center;
				line-height: 1.7;
				span {
					position: relative;
					display: block;
					::after {
						content: "";
						position: absolute;
						width: 105%;
						height: 0.3rem;
						background: ${(props) => props.colors.mainColor};
						bottom: -0.4rem;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				@media (max-width: 350px) {
					font-size: 1rem;
				}
			}
			@media (max-width: 570px) {
				margin: 0 1rem;
			}
			.message-error-screen {
				h4 {
					margin: 0;
				}
			}
			position: relative;
			::after,
			::before {
				content: "";
				position: absolute;
				background: ${(props) => props.colors.mainColor};
				height: 3rem;
				width: 53%;
			}
			::after {
				top: 0;
				right: 3rem;
				transform: translateY(100%);
			}
			::before {
				bottom: 0;
				left: 3rem;
				transform: translateY(-100%);
			}
		}

		form {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			box-sizing: border-box;
			padding: 2rem 3rem 0.7rem;
			.personal-info,
			.topic,
			.message,
			.submit-btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 1rem;
				/* margin-bottom: 0.5rem; */
				.name,
				.email {
					width: 48%;
				}
			}
			.topic,
			.message,
			.name,
			.email {
				.MuiOutlinedInput-root {
					color: ${(props) => props.colors.contrastColor};
					background: ${(props) => props.colors.mainColor};
					font-family: "Montserrat", sans-serif;
					border-radius: 0;
				}
				.MuiOutlinedInput-input {
					line-height: 1.4;
					::-webkit-scrollbar {
						width: 5px;
					}
					::-webkit-scrollbar-track {
						background: ${(props) =>
							props.colors.secondaryColor + "50"};
					}
					::-webkit-scrollbar-thumb {
						background: ${(props) => props.colors.contrastColor};
					}
				}

				.Mui-focused .MuiOutlinedInput-notchedOutline {
					border-color: ${(props) => props.colors.contrastColor};
					border-width: 2px;
				}
				.MuiOutlinedInput-notchedOutline {
					border-color: ${(props) => props.colors.contrastColor};
					border-width: 2px;
				}
				.Mui-error .MuiOutlinedInput-notchedOutline {
					border-color: red;
					border-width: 2px;
				}
				.MuiFormHelperText-root {
					position: absolute;
					bottom: 0;
					transform: translateY(110%);
					font-family: "Montserrat", sans-serif;
					font-weight: 700;
				}
				.MuiInputLabel-root {
					font-family: "Montserrat", sans-serif;
					color: ${(props) => props.colors.contrastColor};
				}
				.Mui-focused.MuiInputLabel-root {
					color: ${(props) => props.colors.contrastColor};
				}
			}

			.submit-btn {
				justify-content: end;
				margin-bottom: 0.5rem;
				button {
					font-family: "Montserrat", sans-serif;
					background: ${(props) => props.colors.contrastColor};
					color: ${(props) => props.colors.secondaryColor};
					border: none;
					padding: 0.4rem 1rem;
					margin-right: -1.5rem;
					font-size: 1.4rem;
					text-transform: uppercase;
					letter-spacing: 1px;
					transition: all 0.3s;
					text-align: right;
					width: 40%;
					:hover {
						transform: translateY(-10%);
					}
					:disabled {
						background: ${(props) =>
							props.colors.contrastColor + "70"};
						:hover {
							transform: none;
						}
					}
					@media (max-width: 500px) {
						margin-right: 0;
					}
					@media (max-width: 450px) {
						width: 60%;
					}
				}
			}
			@media (max-width: 700px) {
				.personal-info {
					flex-direction: column;
					.name,
					.email {
						width: 100%;
					}
					.name {
						margin-bottom: 1rem;
					}
				}
			}
			@media (max-width: 650px) {
				.personal-info {
					.name {
						margin-bottom: 1.5rem;
					}
				}
			}
			@media (max-width: 500px) {
				padding: 1rem 1.5rem 0.7rem;
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
	}

	.contact-side-back,
	.contact-side-main {
		grid-column: 23/30;
		grid-row: 12/17;
		@media (max-width: 1079px) {
			grid-row: 18/20;
			grid-column: 7/28;
		}
		@media (max-width: 950px) {
			grid-column: 6/29;
		}
		@media (max-width: 830px) {
			grid-column: 5/30;
		}
		@media (max-width: 730px) {
			grid-row: 17/20;
			grid-column: 9/26;
		}
		@media (max-width: 650px) {
			grid-column: 6/25;
		}
		@media (max-width: 540px) {
			grid-column: 4/27;
		}
		@media (max-width: 440px) {
			grid-column: 2/29;
		}
		@media (max-width: 375px) {
			grid-row: 16/20;
		}
	}
	.contact-side-main {
		background: ${(props) => props.colors.secondaryColor};
		display: flex;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
		position: relative;
		justify-content: space-around;
		align-items: flex-start;
		flex-direction: column;
		color: ${(props) => props.colors.contrastColor};
		padding: 1.5rem 2.5rem;
		@media (max-width: 1650px) {
			padding: 1.5rem 2rem;
		}
		@media (max-width: 1450px) {
			padding: 1.5rem 1.5rem;
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
		a {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: ${(props) => props.colors.contrastColor};
			text-decoration: none;
			font-size: 1.3rem;
			transition: all 0.3s;
			word-break: break-all;
			div {
				margin: 0 1rem;
			}
			.MuiSvgIcon-root {
				font-size: 2rem;
				color: ${(props) => props.colors.mainColor};
				transition: all 0.3s;
			}
			:hover {
				color: ${(props) => props.colors.mainColor};
				.MuiSvgIcon-root {
					transform: scale(1.1);
				}
			}
			@media (max-width: 1650px) {
				font-size: 1.2rem;
			}
			@media (max-width: 1450px) {
				font-size: 1.1rem;
			}
			@media (max-width: 1250px) {
				font-size: 1rem;
			}
		}
		@media (max-width: 1079px) {
			flex-direction: row;
			align-items: center;
			a {
				width: fit-content;
				margin: 0.5rem 0;
				div {
					padding: 0.4rem 0;
				}
			}
		}
		@media (max-width: 730px) {
			flex-direction: column;
			justify-content: space-between;
			align-items: start;
		}
		@media (max-width: 375px) {
			align-items: center;
			padding: 0.7rem 0.2rem;
			a {
				flex-direction: column;
			}
		}
	}

	.left-section,
	.bottom-section,
	.right-section {
		z-index: 1;
		width: 100%;
		height: 100%;
		position: relative;
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
		height: ${(props) => (props.wordLength === 4 ? 73 : 100)}%;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
		z-index: 2;
		width: ${(props) => (props.wordLength === 4 ? 200 : 150)}px;
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
			height: calc(80% / ${(props) => props.wordLength});
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
		height: 120px;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		width: 55%;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		.letter-container {
			width: calc(95% / 7);
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
			/* fill: #d4d0c1; */
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
		transform: rotate(180deg);
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
		/* color: #d4d0c1; */
		font-family: "BIZ UDPMincho", serif;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
	}
`;
