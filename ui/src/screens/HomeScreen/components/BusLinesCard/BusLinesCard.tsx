import { Card, CardContent, CardHeader } from "@mui/material"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import * as S from "./styles"
import { useGlobalData } from "contexts/GlobalContext/hooks"
import { generatePath, Link } from "react-router-dom"
import { BUS_LINE } from "urls"

function BusLinesCard() {
	const { busLines } = useGlobalData()

	return (
		<Card>
			<CardHeader
				title={
					<S.TitleText>
						<DirectionsBusIcon />
						Rozkład linii autobusowych
					</S.TitleText>
				}
			/>
			<CardContent>
				<S.BusLinesGrid>
					{busLines.map((busLine) => (
						<Link to={generatePath(BUS_LINE, { bus_line: busLine.id.toString() })}>
							<S.BusLine number={busLine.line_number} />
						</Link>
					))}
				</S.BusLinesGrid>
			</CardContent>
		</Card>
	)
}

export default BusLinesCard
