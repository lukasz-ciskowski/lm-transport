import styled from "styled-components"
import { theme } from "styles/theme"

export const Layout = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${theme.spacing(10)};
	.MuiPaper-root {
		width: 700px;
	}

	.MuiTabs-flexContainer {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	.MuiTabs-root {
		border-bottom: 1px solid ${theme.palette.grey[200]};
	}
`

export const TabsContent = styled.div`
	padding: ${theme.spacing(5)} ${theme.spacing(10)};
	position: relative;
`
