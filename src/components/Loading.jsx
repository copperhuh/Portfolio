import React from "react";
import styled from "styled-components";

export default function Loading() {
	return <LoadingStyled>Loading</LoadingStyled>;
}

const LoadingStyled = styled.div`
	height: 100%;
	width: 100%;
	background: blue;
`;
