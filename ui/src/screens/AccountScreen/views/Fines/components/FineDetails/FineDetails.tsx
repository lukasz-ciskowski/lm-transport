import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Dialog,
	Grid,
	Typography,
} from "@mui/material"
import moment from "moment"
import * as S from "./styles"
import { useMutation, useQuery } from "react-query"
import { payFine, retrieveFine } from "./api"
import { useState } from "react"

interface Props {
	onClose: () => void
	id: number
	onResetData: () => void
}

function FineDetails({ onClose, id, onResetData }: Props) {
	const { data } = useQuery("single-fine", retrieveFine(id))
	const [isResolved, setIsResolved] = useState<boolean | undefined>(undefined)
	const { mutate, isLoading } = useMutation(payFine)

	const handlePay = () =>
		mutate(id, {
			onSuccess: () => {
				setIsResolved(true)
				onResetData()
			},
		})

	if (!data) return <></>
	return (
		<Dialog open={true} onClose={onClose}>
			<Card>
				<S.Content>
					<CardHeader title="Informacje o mandacie" />
					<CardContent>
						<Grid container gap={4}>
							<Grid item container>
								<Grid item xs={4}>
									<Typography variant="body2">Data wystawienia</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">
										{moment(data.fine.date).format("dddd, DD MMM. yyyy HH:mm")}
									</Typography>
								</Grid>
							</Grid>
							<Grid item container alignItems="center">
								<Grid item xs={4}>
									<Typography variant="body2">Status mandatu</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">
										<Chip
											label={
												isResolved ?? data.fine.is_paid
													? "Opłacony"
													: "Do opłacenia"
											}
											variant="filled"
											color={
												isResolved ?? data.fine.is_paid
													? "default"
													: "error"
											}
										/>
									</Typography>
								</Grid>
							</Grid>
							<Grid item container alignItems="center">
								<Grid item xs={4}>
									<Typography variant="body2">Cena</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">
										<b>
											{Intl.NumberFormat("pl-PL", {
												style: "currency",
												currency: "PLN",
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})
												.format(data.fine.fine_price)
												.toString()}
										</b>
									</Typography>
								</Grid>
							</Grid>
							{!isResolved && (
								<Button
									variant="contained"
									disabled={isLoading}
									onClick={handlePay}
								>
									Opłać
								</Button>
							)}
						</Grid>
					</CardContent>
					<CardActions style={{ justifyContent: "flex-end" }}>
						<Button color="secondary" onClick={onClose}>
							Zamknij
						</Button>
					</CardActions>
				</S.Content>
			</Card>
		</Dialog>
	)
}

export default FineDetails
