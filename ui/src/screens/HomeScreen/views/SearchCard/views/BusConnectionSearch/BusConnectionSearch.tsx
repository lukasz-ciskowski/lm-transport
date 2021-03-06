import { DesktopDatePicker, TimePicker } from "@mui/lab"
import { Button, CircularProgress, Divider, Grid, TextField } from "@mui/material"
import BusStopSelect from "components/BusStopSelect"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { findConnections } from "./api"
import * as S from "./styles"
import LinesResult from "../../components/LinesResult"
import moment from "moment"
import { BusConnectionForm } from "./types"
import { BusStop } from "models/busStop"

interface Props {
	busStops: BusStop[]
}

function BusConnectionSearch({ busStops }: Props) {
	const { control, handleSubmit, formState, watch } = useForm<BusConnectionForm>({
		mode: "onChange",
		defaultValues: {
			date: new Date(),
			time: new Date(),
		},
	})
	const { data, mutate, isLoading } = useMutation(findConnections)

	const onSubmit = (data: BusConnectionForm) => {
		mutate(data)
	}

	const [fromBusStopId, toBusStopId, date, time] = watch([
		"fromBusStopId",
		"toBusStopId",
		"date",
		"time",
	])
	const dateAndTime = moment(date)
		.hours(time.getHours())
		.minutes(time.getMinutes())
		.startOf("minute")
	const selectedBusStopFrom = busStops.find((busStop) => busStop.id === fromBusStopId)
	return (
		<>
			<S.Form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={5}>
					<Grid item container xs={12}>
						<Controller
							name="fromBusStopId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<BusStopSelect
									label="Skąd"
									size="small"
									data={busStops.filter((busStop) => busStop.id !== toBusStopId)}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item container xs={12}>
						<Controller
							name="toBusStopId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<BusStopSelect
									label="Dokąd"
									size="small"
									data={busStops.filter(
										(busStop) => busStop.id !== fromBusStopId
									)}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid container item spacing={4}>
						<Grid item xs={6}>
							<Controller
								name="date"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<S.DayPickerWrapper>
										<DesktopDatePicker
											{...field}
											inputFormat="dddd, DD MMM. yyyy"
											renderInput={(params) => (
												<TextField size="small" {...params} />
											)}
										/>
									</S.DayPickerWrapper>
								)}
							/>
						</Grid>
						<Grid item xs={3}>
							<Controller
								name="time"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<TimePicker
										{...field}
										onChange={(date: any) => {
											field.onChange(date.toDate())
										}}
										renderInput={(params) => (
											<TextField size="small" {...params} />
										)}
									/>
								)}
							/>
						</Grid>
						<Grid item container xs={3} alignItems="center">
							<Button
								type="submit"
								color="primary"
								variant="contained"
								style={{ width: "100%" }}
								disabled={!formState.isValid}
							>
								Wyszukaj
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</S.Form>
			<S.Result>
				{isLoading && (
					<Grid container xs={12} justifyContent="center">
						<CircularProgress />
					</Grid>
				)}
				{data && selectedBusStopFrom && (
					<>
						<Divider />
						<LinesResult
							arrivals={data.connections}
							busStop={selectedBusStopFrom}
							date={dateAndTime.toDate()}
						/>
					</>
				)}
			</S.Result>
		</>
	)
}

export default BusConnectionSearch
