import { DesktopDatePicker, TimePicker } from "@mui/lab"
import { Button, CircularProgress, Divider, Grid, TextField } from "@mui/material"
import BusStopSelect from "components/BusStopSelect"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { findArrivals } from "./api"
import * as S from "./styles"
import moment from "moment"
import { BusStopSearchForm } from "./types"
import { BusStop } from "models/busStop"
import LinesResult from "../../components/LinesResult"

interface Props {
	busStops: BusStop[]
}

function BusStopSearch({ busStops }: Props) {
	const { control, handleSubmit, formState, watch } = useForm<BusStopSearchForm>({
		mode: "onChange",
		defaultValues: {
			date: new Date(),
			time: new Date(),
		},
	})
	const { data, mutate, isLoading } = useMutation(findArrivals)

	const onSubmit = (data: BusStopSearchForm) => {
		mutate(data)
	}

	const [busStopId, date, time] = watch(["busStopId", "date", "time"])
	const dateAndTime = moment(date)
		.hours(time.getHours())
		.minutes(time.getMinutes())
		.startOf("minute")
	const selectedBusStop = busStops.find((busStop) => busStop.id === busStopId)
	return (
		<>
			<S.Form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={5}>
					<Grid item container xs={12}>
						<Controller
							name="busStopId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<BusStopSelect
									label="Znajdź przystanek"
									size="small"
									data={busStops}
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
				{data && selectedBusStop && (
					<>
						<Divider />
						<LinesResult
							arrivals={data.arrivals}
							busStop={selectedBusStop}
							date={dateAndTime.toDate()}
						/>
					</>
				)}
			</S.Result>
		</>
	)
}

export default BusStopSearch
