import BusLineBox from "components/BusLineBox"
import styled from "styled-components"
import { theme } from "styles/theme"

export const TitleText = styled.div`
	font-weight: 500;
	display: flex;
	align-items: center;
	font-size: ${theme.typography.subtitle1.fontSize};
	gap: ${theme.spacing(2)};
`

export const BusLinesGrid = styled.div`
	display: grid;
	grid-template-rows: repeat(auto-fill, 35px);
	grid-template-columns: repeat(auto-fill, 35px);
	gap: ${theme.spacing(3)};
`

export const BusLine = styled(BusLineBox)`
	width: 35px;
	height: 35px;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${theme.palette.grey[400]};
		cursor: pointer;
	}
`
