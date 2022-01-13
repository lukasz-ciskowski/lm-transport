import { Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { theme } from "styles/theme"

interface ConnectionProps {
	index: number
	totalSize: number
}

export const ConnectionImg = styled.img.attrs((props: ConnectionProps) => {
	if (props.index === 0) return { src: "/images/connection-top.svg" }
	if (props.index === props.totalSize - 2) return { src: "/images/connection-pre-last.svg" }
	if (props.index === props.totalSize - 1) return { src: "/images/connection-last.svg" }
	return { src: "/images/connection-middle.svg" }
})<ConnectionProps>`
	${(props) => {
		if (props.index === 0)
			return css`
				margin-left: -17px;
				width: 45px;
				height: 45px;
				margin-right: -3px;
				& + a .MuiTypography-root {
					margin-top: -2px;
				}
			`
		if (props.index === props.totalSize - 2)
			return css`
				margin-left: -10px;
				width: 50px;
				height: 50px;
				margin-right: -14px;
				& + a .MuiTypography-root {
					margin-top: -3px;
				}
			`
		if (props.index === props.totalSize - 1)
			return css`
				margin-left: -9px;
				margin-top: -7px;
				width: 16px;
				height: 16px;
				margin-right: 20px;
				& + a .MuiTypography-root {
					margin-top: -10px;
				}
			`
		return css`
			width: 40px;
			height: 40px;
			margin-right: -14px;
			& + a .MuiTypography-root {
				margin-top: -5px;
			}
		`
	}};
`

export const ConnectionText = styled(Typography)<ConnectionProps>`
	${(props) => {
		console.log(props.index)

		if (props.index === 0 || props.index === props.totalSize - 1)
			return css`
				font-weight: 500 !important;
			`
		return ` `
	}};
    transition: 200ms color;
	&:hover {
		color: ${theme.palette.primary.main};
		cursor: pointer;
	}
`

export const ConnectionsBox = styled.div`
	display: flex;
	gap: ${theme.spacing(5)};
	width: 300px;
`
