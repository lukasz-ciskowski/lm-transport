import { Grid } from "@mui/material"
import BusLineBox from "components/BusLineBox"
import styled, { css } from "styled-components"
import { theme } from "styles/theme"

export const BusLineIndicator = styled(BusLineBox)`
	width: 40px;
	height: 40px;
`

interface ArrivalRowProps {
	active: boolean
	current: boolean
}

export const ArrivalRow = styled(Grid)<ArrivalRowProps>`
	padding-left: ${theme.spacing(4)};

	.bus-stop:hover {
		font-weight: 500;
        cursor: pointer;
	}
	${(props) => {
		if (props.current)
			return css`
				border-left: 3px solid ${theme.palette.primary.main};
				.bus-stop {
					font-weight: 500;
				}
				p {
					text-indent: -3px;
				}
			`
		if (!props.active)
			return css`
				color: ${theme.palette.grey[300]};
			`
	}};
`
