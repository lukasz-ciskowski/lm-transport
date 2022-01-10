import { DesktopDatePicker, TimePicker } from "@mui/lab"
import { Button, Grid, TextField } from "@mui/material"
import BusStopSelect from "components/BusStopSelect"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { BusStop } from "screens/HomeScreen/types"
import { findArrivals } from "./api"
import * as T from "./types"
import * as S from "./styles"

interface Props {
	busStops: BusStop[]
}

function BusStopSearch({ busStops }: Props) {
	const { control, handleSubmit, formState } = useForm<T.BusStopSearchForm>({
		mode: "onBlur",
		defaultValues: {
			date: new Date(),
			time: new Date(),
		},
	})
	const { data, mutate } = useMutation(findArrivals)

	const onSubmit = (data: T.BusStopSearchForm) => {
		console.log(data)
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
									renderInput={(params) => <TextField size="small" {...params} />}
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
		</form>
	)
}

export default BusStopSearch
