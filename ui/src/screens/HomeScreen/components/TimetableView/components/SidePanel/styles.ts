import { Grid } from "@mui/material"
import styled from "styled-components"
import { theme } from "styles/theme"

export const SidePanelContainer = styled(Grid)`
	border-right: 1px solid ${theme.palette.divider};
`

export const HeaderBox = styled.div`
	display: flex;
	gap: ${theme.spacing(3)};
	align-items: center;
	margin-bottom: ${theme.spacing(8)};
`

export const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
`