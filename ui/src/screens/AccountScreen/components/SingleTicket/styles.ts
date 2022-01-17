import { Divider } from "@mui/material"
import styled from "styled-components"
import { theme } from "styles/theme"

export const Content = styled.div`
	padding: ${theme.spacing(4)};
`

export const DashedDivider = styled(Divider)`
	border-style: dashed !important; 
`