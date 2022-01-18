import styled from "styled-components"
import { theme } from "styles/theme"

export const Wrapper = styled.div`
	min-height: 90vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`

export const Header = styled.div`
	padding-bottom: ${theme.spacing(4)};
`

export const PaginationContainer = styled.div`
	margin-top: auto;
	align-self: center;
`
