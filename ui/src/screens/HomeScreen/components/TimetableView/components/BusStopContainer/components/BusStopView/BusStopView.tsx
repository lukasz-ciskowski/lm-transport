import { DesktopDatePicker } from "@mui/lab"
import { CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { Directions } from "common/Directions"
import { useGlobalData } from "contexts/GlobalContext/hooks"
import { useRouterQuery } from "hooks/useRouterQuery"
import moment from "moment"
import qs from "qs"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { generatePath, Link, useParams } from "react-router-dom"
import { BUS_LINE, ROUTE_RUN } from "urls"
import SidePanel from "../../../SidePanel"
import { BusStopContainerBaseProps } from "../../types"
import { getRouteArrivals } from "./api"
import * as S from "./styles"
import { arrivalsGroupedByHour } from "./utils"

type Props = BusStopContainerBaseProps

type Params = { bus_line: string; bus_stop: string }

function BusStopView({ initializing, schemas, busStop }: Props) {
	const { bus_line, bus_stop } = useParams<Params>()
	const query = useRouterQuery()
	const { busLines } = useGlobalData()
	const [selectedDate, setSelectedDate] = useState(new Date())

	const direction = (query.get("direction") as Directions | null) || Directions.Forward
	const { data, isLoading: arrivalsLoading, mutate } = useMutation(getRouteArrivals)

	const groupedArrivals = data ? arrivalsGroupedByHour(data.arrivals, selectedDate) : []

	useEffect(() => {
		mutate({ busStop: Number(bus_stop), date: selectedDate, direction: direction })
	}, [bus_stop, direction, mutate, selectedDate])

	const handleSelectDate = (newValue: Date | null) => {
		if (newValue) setSelectedDate(newValue)
	}

	if (arrivalsLoading && initializing)
		return (
			<Grid container alignItems="center" justifyContent="center" xs={12}>
				<CircularProgress size={48} />
			</Grid>
		)

	return (
		<CardContent style={{ height: "100%" }}>
			<Grid container columnSpacing={8}>
				<SidePanel
					schemas={schemas}
					prevRoute={{
						pathname: generatePath(BUS_LINE, {
							bus_line,
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
						<Grid item container xs="auto" alignItems="center" columnGap={2}>
							<Typography variant="body2">Rozkład jazdy na</Typography>
							<DesktopDatePicker
								onChange={handleSelectDate}
								value={selectedDate}
								inputFormat="dddd, DD MMM. yyyy"
								renderInput={(params) => <TextField size="small" {...params} />}
							/>
						</Grid>
					</Grid>
					<Grid item container flexDirection="column">
						{Object.entries(groupedArrivals).map(([hour, arrivals]) => (
							<S.ArrivalsRow>
								<S.HourArrivalBox text={hour} />
								{arrivals.map((arr) => (
									<Link
										to={{
											pathname: generatePath(ROUTE_RUN, {
												bus_stop,
												bus_line,
												run: arr.route_run.id.toString(),
											}),
											search: qs.stringify({ direction }),
										}}
									>
										<S.SingleArrivalBox
											text={moment(arr.arrival_time, "HH:mm").format("mm")}
											active={arr.active}
										/>
									</Link>
								))}
							</S.ArrivalsRow>
						))}
					</Grid>
				</Grid>
			</Grid>
		</CardContent>
	)
}

export default BusStopView
