import styled from "styled-components"
import { theme } from "styles/theme"

export const Box = styled.div`
	width: 30px;
	height: 30px;
	border: 1px solid ${theme.palette.common.black};
	border-radius: 5px;
	background-color: ${theme.palette.grey[300]};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${theme.typography.body2.fontSize};
`
