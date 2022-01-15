import ArrivalBox from "components/ArrivalBox"
import BusLineBox from "components/BusLineBox"
import styled, { css } from "styled-components"
import { theme } from "styles/theme"

export const ArrivalsRow = styled.div`
	display: flex;
	gap: ${theme.spacing(2)};
	margin-bottom: ${theme.spacing(2)};
`

export const BusLineIndicator = styled(BusLineBox)`
	width: 40px;
	height: 40px;
`

export const HourArrivalBox = styled(ArrivalBox)`
	border: 1px solid ${theme.palette.grey[500]};
	color: ${theme.palette.grey[500]};
	background-color: transparent;
`

interface SingleArrivalBoxProps {
	active: boolean
}

export const SingleArrivalBox = styled(ArrivalBox)<SingleArrivalBoxProps>`
	transition: 200ms background-color;
	cursor: pointer;
	${(props) => {
		if (!props.active)
			return css`
				border: 1px solid ${theme.palette.grey[300]};
				color: ${theme.palette.grey[300]};
				background-color: ${theme.palette.grey[200]};
				:hover {
					background-color: ${theme.palette.grey[300]};
					color: ${theme.palette.grey[400]};
				}
			`

		return css`
			:hover {
				background-color: ${theme.palette.grey[400]};
			}
		`
	}}
`
