import styled from "styled-components"
import { theme } from "styles/theme"

export const EndBusStopWrapper = styled.div`
	color: ${theme.palette.grey[400]};
	margin-left: ${theme.spacing(4)};
	display: flex;
	align-items: center;
`

export const TicketButton = styled.div`
	margin-left: ${theme.spacing(2)};
`

export const DurationOutput = styled.b`
	display: block;
	&::first-letter {
		text-transform: uppercase;
	}
`
