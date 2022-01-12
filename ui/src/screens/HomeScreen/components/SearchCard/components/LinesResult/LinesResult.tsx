import { Grid, IconButton, Typography } from "@mui/material"
import BusLineBox from "components/BusLineBox"
import { BusStop } from "screens/HomeScreen/types"
import { SingleArrival } from "./types"
import { ConfirmationNumber, ArrowRightAlt } from "@mui/icons-material"
import * as S from "./styles"
import humanizeDuration from "humanize-duration"
import moment from "moment"

interface Props {
	arrivals: SingleArrival[]
	busStop: BusStop
	date: Date
}

const TOP_N = 3
function LinesResult({ arrivals, busStop, date }: Props) {
	return (
		<>
			{arrivals
				.map((arrival) => {
					const time = moment(arrival.arrival_time, "hh:mm")

					return {
						...arrival,
						interval: moment
							.duration(
								moment(date)
									.hours(time.hours())
									.minutes(time.minutes())
									.startOf("minute")
									.diff(moment())
							)
							.as("milliseconds"),
					}
				})
				.filter((arrival) => arrival.interval > 0)
				.sort((a, b) => a.interval - b.interval)
				.filter((_, index) => index < TOP_N)
				.map((arrival) => (
					<Grid container spacing={3} xs={12} alignItems="center">
						<Grid item xs={1}>
							<BusLineBox number={arrival.route_run.bus_line.line_number} />
						</Grid>
						<Grid item xs={7} container>
							<Typography variant="subtitle1">
								<b>{busStop.name}</b>
							</Typography>
							<S.EndBusStopWrapper>
								<ArrowRightAlt />
								<Typography variant="body2">Do {arrival.last_stop}</Typography>
							</S.EndBusStopWrapper>
						</Grid>
						<Grid item xs={4} container justifyContent="flex-end" alignItems="center">
							<Typography variant="subtitle1">
								<S.DurationOutput>{moment.duration(arrival.interval).humanize(true)}</S.DurationOutput>
							</Typography>
							<S.TicketButton>
								<IconButton>
									<ConfirmationNumber color="primary" />
								</IconButton>
							</S.TicketButton>
						</Grid>
					</Grid>
				))}
		</>
	)
}

export default LinesResult
