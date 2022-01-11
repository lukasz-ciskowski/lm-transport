import { Typography } from "@mui/material"
import styled from "styled-components"
import { theme } from "styles/theme"

export const Content = styled.div`
	.MuiTabs-root {
		border-bottom: 1px solid ${theme.palette.grey[200]};
	}
	.MuiTab-root {
		min-height: unset;
	}
	padding: ${theme.spacing(2)};
`

export const Title = styled(Typography)`
	padding-bottom: ${theme.spacing(2)};
	font-weight: 500;
`

export const FormContent = styled.div`
	padding: ${theme.spacing(6)} 0 0;
`
