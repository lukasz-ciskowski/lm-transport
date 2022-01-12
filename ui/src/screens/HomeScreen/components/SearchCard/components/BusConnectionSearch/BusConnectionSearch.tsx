import { DesktopDatePicker, TimePicker } from "@mui/lab"
import { Button, CircularProgress, Divider, Grid, TextField } from "@mui/material"
import BusStopSelect from "components/BusStopSelect"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { BusStop } from "screens/HomeScreen/types"
import { findConnections } from "./api"
import * as T from "./types"
import * as S from "./styles"
import LinesResult from "../LinesResult"
import moment from "moment"
import { useEffect, useRef } from "react"

interface Props {
	busStops: BusStop[]
}

const REQUEST_INTERVAL = moment.duration({ minutes: 1 }).as("milliseconds")

function BusConnectionSearch({ busStops }: Props) {
	const { control, handleSubmit, formState, watch } = useForm<T.BusConnectionForm>({
		mode: "onChange",
		defaultValues: {
			date: new Date(),
			time: new Date(),
		},
	})
	const { data, mutate, isLoading } = useMutation(findConnections)
	const interval = useRef<NodeJS.Timer>()

	const onSubmit = (data: T.BusConnectionForm) => {
		if (interval.current) clearInterval(interval.current)
		interval.current = setInterval(() => {
			mutate(data)
		}, REQUEST_INTERVAL)
		mutate(data)
	}

	useEffect(() => {
		if (interval.current) clearInterval(interval.current)
	}, [])

	const [fromBusStopId, toBusStopId, date] = watch(["fromBusStopId", "toBusStopId", "date"])
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
							date={date}
						/>
					</>
				)}
			</S.Result>
		</>
	)
}

export default BusConnectionSearch
