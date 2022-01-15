import { CardContent, CircularProgress, Grid, Typography } from "@mui/material"
import { useGlobalData } from "contexts/GlobalContext/hooks"
import { useRouterQuery } from "hooks/useRouterQuery"
import moment from "moment"
import qs from "qs"
import { useQuery } from "react-query"
import { generatePath, Link, useParams } from "react-router-dom"
import { theme } from "styles/theme"
import { BUS_STOP } from "urls"
import SidePanel from "../../../SidePanel"
import { BusStopContainerBaseProps } from "../../types"
import { getRouteRun } from "./api"
import * as S from "./styles"

type Props = BusStopContainerBaseProps

type Params = { bus_line: string; bus_stop: string; run: string }

function RouteRunView({ initializing, schemas, busStop }: Props) {
	const { bus_stop, bus_line } = useParams<Params>()
	const { busLines } = useGlobalData()
	const { data, isLoading } = useQuery("route-run", getRouteRun(Number(bus_stop)))
	const query = useRouterQuery()

	if (isLoading && initializing)
		return (
			<Grid container alignItems="center" justifyContent="center" xs={12}>
				<CircularProgress size={48} />
			</Grid>
		)

	const indexStartingPoint =
		data?.arrivals.findIndex((arr) => arr.bus_stop.id === Number(bus_stop)) ?? -1
	const timerStartingPoint = moment(data?.arrivals[indexStartingPoint]?.arrival_time, "HH:mm")
	return (
		<CardContent style={{ height: "100%" }}>
			<Grid container columnSpacing={8}>
				<SidePanel
					schemas={schemas}
					prevRoute={{
						pathname: generatePath(BUS_STOP, {
							bus_line,
							bus_stop,
						}),
						search: qs.stringify({
							direction: query.get("direction"),
						}),
					}}
				/>
				<Grid container item xs={9} rowGap={10} flexDirection="column">
					<Grid item container justifyContent="space-between" alignItems="center">
						<Grid
							item
							container
							flexDirection="row"
							columnGap={4}
							alignItems="center"
							xs="auto"
						>
							<S.BusLineIndicator
								number={
									busLines.find((line) => line.id === Number(bus_line))
										?.line_number ?? 0
								}
							/>
							<div>
								<Typography variant="body2">Przystanek</Typography>
								<Typography variant="h6">{busStop?.bus_stop.name}</Typography>
							</div>
						</Grid>
					</Grid>
					<Grid item container flexDirection="column" rowGap={3}>
						{data?.arrivals.map((arrival, i) => (
							<S.ArrivalRow
								item
								container
								active={i >= indexStartingPoint}
								current={i === indexStartingPoint}
							>
								<Grid item xs={4}>
									<Link
										to={{
											pathname: generatePath(BUS_STOP, {
												bus_line,
												bus_stop: arrival.bus_stop.id.toString(),
											}),
											search: qs.stringify({
												direction: query.get("direction"),
											}),
										}}
									>
										<Typography className="bus-stop" variant="body1">
											{arrival.bus_stop.name}
										</Typography>
									</Link>
								</Grid>
								<Grid
									item
									container
									xs={8}
									flexDirection="row"
									alignItems="center"
									columnGap={4}
								>
									<Typography variant="body1">
										<b>{arrival.arrival_time}</b>
									</Typography>
									{i > indexStartingPoint && (
										<Typography variant="body2">
											<span style={{ color: theme.palette.grey[400] }}>
												{moment
													.duration(
														moment(arrival.arrival_time, "HH:mm").diff(
															timerStartingPoint
														)
													)
													.humanize(true)}
											</span>
										</Typography>
									)}
								</Grid>
							</S.ArrivalRow>
						))}
					</Grid>
				</Grid>
			</Grid>
		</CardContent>
	)
}

export default RouteRunView
