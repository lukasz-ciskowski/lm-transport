import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Dialog,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material"
import { useGlobalData } from "contexts/GlobalContext/hooks"
import { Controller, useForm } from "react-hook-form"
import { FormState } from "./types"
import * as S from "./styles"
import { DesktopDatePicker, TimePicker } from "@mui/lab"
import { theme } from "styles/theme"
import { useMutation } from "react-query"
import { buyTicket } from "./api"
import { toast } from "react-toastify"

interface Props {
	onClose: () => void
	onRefreshView?: () => void
	initialState?: Partial<FormState>
}

function BuyTicketModal({ onClose, onRefreshView, initialState }: Props) {
	const { control, watch, formState, handleSubmit } = useForm<FormState>({
		mode: "onChange",
		defaultValues: {
			...initialState,
			start_date: initialState?.start_date || new Date(),
			start_time: initialState?.start_time || new Date(),
		},
	})
	const { mutate, isLoading, error } = useMutation(buyTicket)
	const state = useGlobalData()

	const [ticketType, busLine, discount] = watch(["ticket_type", "bus_line", "discount"])
	const selectedTicket = state.ticketTypes.find((t) => t.id === ticketType)
	const selectedDiscount = state.discounts.find((t) => t.id === discount)
	const isSingleTicket = ticketType && !selectedTicket?.static_duration

	const ticketPrice = selectedDiscount
		? (selectedTicket?.price ?? 0) * ((100 - selectedDiscount.percentage) / 100)
		: selectedTicket?.price ?? 0

	const onSubmit = (form: FormState) => {
		mutate(form, {
			onSuccess: () => {
				toast.success("Zakupiono bilet")
				if (onRefreshView) onRefreshView()
				onClose()
			},
		})
	}

	return (
		<Dialog open={true} onClose={onClose}>
			<Card>
				<form onSubmit={handleSubmit(onSubmit)}>
					<S.Content>
						<CardHeader title="Zakup bilet" />
						<CardContent>
							<Grid container gap={5}>
								{error && (
									<Alert style={{ width: "100%" }} severity="error">
										Nie udało sie zakupić biletu
									</Alert>
								)}
								<Controller
									name="ticket_type"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<FormControl fullWidth size="small" required>
											<InputLabel>Rodzaj biletu</InputLabel>
											<Select {...field} label="Rodzaj biletu">
												{state.ticketTypes.map((element) => (
													<MenuItem value={element.id}>
														{element.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								/>
								<Grid item container spacing={2}>
									<Grid item xs={8}>
										<Controller
											name="start_date"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<S.DayPickerWrapper>
													<DesktopDatePicker
														{...field}
														inputFormat="dddd, DD MMM. yyyy"
														label="Data rozpoczęcia"
														renderInput={(params) => (
															<TextField size="small" {...params} />
														)}
													/>
												</S.DayPickerWrapper>
											)}
										/>
									</Grid>
									<Grid item xs={4}>
										<Controller
											name="start_time"
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
								</Grid>
								<Controller
									name="discount"
									control={control}
									render={({ field }) => (
										<FormControl fullWidth size="small">
											<InputLabel>Ulga</InputLabel>
											<Select
												{...field}
												label="Ulga"
												value={field.value ?? "default"}
												onChange={({ target: { value } }) =>
													value !== "default"
														? field.onChange(value)
														: field.onChange(undefined)
												}
											>
												<MenuItem value="default">Brak ulgi</MenuItem>
												{state.discounts.map((element) => (
													<MenuItem value={element.id}>
														{element.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								/>
								{isSingleTicket && (
									<Grid>
										<InputLabel
											style={{
												fontSize: theme.typography.subtitle2.fontSize,
											}}
										>
											Linia autobusowa
										</InputLabel>
										<S.BusLinesGrid>
											<Controller
												name="bus_line"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<>
														{state.busLines.map((bus) => (
															<S.TicketBusLine
																{...field}
																onClick={() =>
																	field.onChange(bus.id)
																}
																number={bus.line_number}
																className={
																	bus.id === busLine
																		? "active"
																		: "inactive"
																}
															/>
														))}
													</>
												)}
											/>
										</S.BusLinesGrid>
									</Grid>
								)}
								<Grid item container alignItems="flex-end" flexDirection="column">
									<Typography variant="caption">Cena za bilet</Typography>
									<Typography variant="h4">
										{Intl.NumberFormat("pl-PL", {
											style: "currency",
											currency: "PLN",
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
										})
											.format(ticketPrice)
											.toString()}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions style={{ justifyContent: "flex-end" }}>
							<Button color="secondary" onClick={onClose}>
								Anuluj
							</Button>
							<Button
								color="primary"
								variant="contained"
								type="submit"
								disabled={!formState.isValid || isLoading}
							>
								Zakup
							</Button>
						</CardActions>
					</S.Content>
				</form>
			</Card>
		</Dialog>
	)
}

export default BuyTicketModal
