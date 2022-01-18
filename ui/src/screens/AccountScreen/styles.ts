import { Typography } from "@mui/material"
import styled from "styled-components"
import { theme } from "styles/theme"

export const MenuWrapper = styled.div`
	.MuiListItemText-root {
		padding: ${theme.spacing(1)} 0;
	}

	a {
		width: 100%;
		display: block;
	}

	.active {
		border-left: 4px solid ${theme.palette.primary.main};
	}
	.inactive {
		padding-left: 20px;
	}
`

export const Title = styled.div`
	text-transform: capitalize;
	margin-bottom: ${theme.spacing(5)};
`