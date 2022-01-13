import { CardContent, CircularProgress, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { generatePath, Link, useParams } from "react-router-dom"
import { BUS_STOP } from "urls"
import ConnectionDiagram from "../ConnectionDiagram"
import MainCard from "../MainCard"
import { getSchema } from "./api"
import * as S from "./styles"

type Params = { bus_line: string }

function BusLineView() {
	const { bus_line } = useParams<Params>()
	const { data, isLoading } = useQuery("route-schemas", getSchema(Number(bus_line)))

	return (
		<MainCard>
			<CardContent style={{ height: "100%" }}>
				{isLoading && (
					<Grid
						container
						alignItems="center"
						justifyContent="center"
						style={{ height: "100%" }}
						xs={12}
					>
						<CircularProgress size={48} />
					</Grid>
				)}
				<Grid container justifyContent="center">
					{data?.routes.map((route) => {
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
			</CardContent>
		</MainCard>
	)
}

export default BusLineView
