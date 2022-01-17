import { CircularProgress, Grid } from "@mui/material"
import React from "react"
import { useQuery } from "react-query"
import SingleTicket from "screens/AccountScreen/components/SingleTicket"
import { getActiveTickets } from "./api"

function Tickets() {
	const { data, isLoading } = useQuery("active-tickets", getActiveTickets)

	if (isLoading)
		return (
			<Grid container xs={12} justifyContent="center">
				<CircularProgress />
			</Grid>
		)

	return (
		<>
			{data?.rows.map((row) => (
				<SingleTicket ticket={row} />
			))}
		</>
	)
}

export default Tickets
