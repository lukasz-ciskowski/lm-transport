import {
	CalendarToday,
	DirectionsBus,
	KeyboardArrowDown,
	KeyboardArrowUp,
} from "@mui/icons-material"
import { Button, Grid, Paper, Typography } from "@mui/material"
import LabelBox from "components/LabelBox/LabelBox"
import moment from "moment"
import { useState } from "react"
import { useMutation } from "react-query"
import { Ticket } from "screens/AccountScreen/models/tickets"
import { getTicketDetails } from "./api"
import * as S from "./styles"

interface Props {
	ticket: Ticket
}

function SingleTicket({ ticket }: Props) {
	const { mutate, data } = useMutation(getTicketDetails)
	const [showDetails, setShowDetails] = useState(false)

	const isSingleTicket = !!ticket.bus_line

	const handleFormatDates = () => {
		const start = moment(ticket.start_date)
		const end = moment(ticket.estimated_end_date)

		if (isSingleTicket) {
			return {
				day: start,
				hours: [start, end],
			}
		}
		return {
			days: [start, end],
		}
	}

	const handleSeeDetails = () => {
		setShowDetails((p) => !p)
		if (!data) mutate(ticket.id)
	}

	const datesInput = handleFormatDates()
	return (
		<Paper style={{ width: "100%" }}>
			<S.Content>
				<Grid container gap={2} flexDirection="column">
					<Grid
						item
						container
						justifyContent="space-between"
						flexDirection="column"
						gap={20}
					>
						<Grid item container xs={12} justifyContent="space-between">
							{isSingleTicket ? (
								<Grid xs="auto">
									<Typography>{ticket.ticket_type.name}</Typography>
									<Typography variant="h6">
										Linia autobusowa {ticket.bus_line.line_number}
									</Typography>
								</Grid>
							) : (
								<Grid xs="auto">
									<Typography variant="h6">{ticket.ticket_type.name}</Typography>
								</Grid>
							)}
							<Grid item container gap={4} xs="auto">
								{!isSingleTicket && <CalendarToday fontSize="large" />}
								<DirectionsBus fontSize="large" />
							</Grid>
						</Grid>
						<Grid item container xs={12} justifyContent="space-between" alignItems="center">
							{datesInput.day && (
								<Grid item xs="auto">
									<Typography variant="body2">
										{datesInput.day.format("dddd, DD MMM. yyyy")}
									</Typography>
									<Typography>
										<b>
											{[
												datesInput.hours[0].format("HH:MM"),
												datesInput.hours[0].format("HH:MM"),
											].join(" - ")}
										</b>
									</Typography>
								</Grid>
							)}
							{datesInput.days && (
								<Grid item xs="auto">
									<Typography>
										<b>{datesInput.days[0].format("dddd, DD MMM. yyyy")}</b>
									</Typography>
									<Typography>
										<b>{datesInput.days[1].format("dddd, DD MMM. yyyy")}</b>
									</Typography>
								</Grid>
							)}
							<Button
								variant="outlined"
								endIcon={!showDetails ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
								onClick={handleSeeDetails}
								style={{ width: 150, height: "fit-content" }}
							>
								{!showDetails ? "Szczegóły" : "Ukryj"}
							</Button>
						</Grid>
					</Grid>
					{showDetails && data && (
						<>
							<S.DashedDivider />
								<Grid item container justifyContent="space-between" xs={12}>
									<Grid
										item
										container
										flexDirection="column"
										rowGap={3}
										xs="auto"
									>
										{data.ticket.discount && (
											<LabelBox
												subtitle="Ulga"
												title={data.ticket.discount.name}
											/>
										)}
										<LabelBox
											subtitle="Zakupiono"
											title={moment(data.ticket.bought_at).format(
												"dddd, DD MMM. yyyy HH:mm"
											)}
										/>
									</Grid>
									<Grid item container alignItems="flex-end" xs="auto">
										<div style={{ textAlign: "right" }}>
											<Typography variant="caption">Cena</Typography>
											<Typography variant="h6">
												{Intl.NumberFormat("pl-PL", {
													style: "currency",
													currency: "PLN",
													maximumFractionDigits: 2,
													minimumFractionDigits: 2,
												})
													.format(data.ticket.calculated_price)
													.toString()}
											</Typography>
										</div>
									</Grid>
								</Grid>
						</>
					)}
				</Grid>
			</S.Content>
		</Paper>
	)
}

export default SingleTicket
