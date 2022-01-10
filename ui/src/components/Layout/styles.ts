import styled from "styled-components"
import { theme } from "styles/theme"

export const Head = styled.header`
	height: 60px;
	border-bottom: 1px solid ${theme.palette.grey[300]};
`

export const HeadContent = styled.nav`
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 ${theme.spacing(4)};
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
`

export const LogoContent = styled.div`
	display: flex;
	align-items: center;
    cursor: pointer;
	gap: ${theme.spacing(3)};
`

export const NavSubtitle = styled.b`
	font-size: ${theme.typography.body2.fontSize};
`

export const Content = styled.main`
	max-width: 1400px;
	margin: 0 auto;
	padding: ${theme.spacing(4)};
`
