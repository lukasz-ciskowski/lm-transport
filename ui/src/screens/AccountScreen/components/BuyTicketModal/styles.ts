import BusLineBox from "components/BusLineBox"
import styled from "styled-components"
import { theme } from "styles/theme"

export const Content = styled.div`
	width: 500px;
	padding: ${theme.spacing(3)};
`

export const DayPickerWrapper = styled.div`
	.MuiFormControl-root {
		width: 100%;
	}
`

export const BusLinesGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing(2)};
`

export const TicketBusLine = styled(BusLineBox)`
	width: 35px;
	height: 35px;
	background-color: ${theme.palette.grey[100]};
	transition: border-color 0.2s, color 0.2s;
	:hover {
		cursor: pointer;
		background-color: ${theme.palette.grey[200]};
	}
	&.active {
		border-color: ${theme.palette.primary.main};
		color: ${theme.palette.primary.main};
	}
`
