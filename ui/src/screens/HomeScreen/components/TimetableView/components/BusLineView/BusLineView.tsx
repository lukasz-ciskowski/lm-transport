import { CardContent, CircularProgress, Grid, Typography } from "@mui/material"
import ConnectionDiagram from "../ConnectionDiagram"
import * as S from "./styles"
import { TimetableBaseProps } from "../../types"
import { useParams } from "react-router-dom"

type Props = TimetableBaseProps

type Params = { bus_line: string }

function BusLineView({ initializing, schemas }: Props) {
	const { bus_line } = useParams<Params>()

	if (initializing)
		return (
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				xs={12}
			>
				<CircularProgress size={48} />
			</Grid>
		)

	return (
		<CardContent style={{ height: "100%" }}>
			{bus_line && (
				<Grid container justifyContent="center">
					{schemas?.routes.map((route) => {
						return (
							<Grid item container xs={5} flexDirection="column" alignItems="center">
								<S.TitleBox>
									<Typography variant="subtitle1">Kierunek</Typography>
									<Typography variant="h6">
										{route[1][route[1].length - 1].name}
									</Typography>
								</S.TitleBox>
								<ConnectionDiagram route={route} busLineId={bus_line} />
							</Grid>
						)
					})}
				</Grid>
			)}
		</CardContent>
	)
}

export default BusLineView
