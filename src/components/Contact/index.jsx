import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import svgLetterData from "../../svgLetterData";
import Letter from "../Letter";
import SvgWord from "../SvgWord";
import TextField from "@mui/material/TextField";
import axios from "axios";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import useWindowWidth from "../../hooks/useWindowWidth";
import ContactStyled from "./ContactStyled";

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
		document.documentElement.scrollTop = 0;

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
			<a
				href="https://www.linkedin.com/in/jakub-koper-935609247/"
				target="_blank"
				className="link"
			>
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
