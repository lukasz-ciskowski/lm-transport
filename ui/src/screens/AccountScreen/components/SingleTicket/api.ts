import axios from "axios"
import { RetrieveDetailedTicketResponse } from "./types"

export const getTicketDetails = async (id: number): Promise<RetrieveDetailedTicketResponse> => {
	return {
		ticket: {
			id: 1,
			ticket_type: {
				name: "Bilet jednorazowy",
				price: 3,
			},
			bus_line: {
				id: 1,
				line_number: 127,
			},
			start_date: new Date().toString(),
			estimated_end_date: new Date().toString(),
			bought_at: new Date().toString(),
			calculated_price: 3,
			discount: {
				name: "Papieska",
				percentage: 30,
			},
		},
	}

	// const result = await axios.get(`/api/tickets/${id}`)
	// return result.data
}
