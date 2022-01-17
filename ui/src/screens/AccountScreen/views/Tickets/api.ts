import axios from "axios"
import { TicketsResponse } from "./types"

export const getActiveTickets = async (): Promise<TicketsResponse> => {
	return {
		total: 10,
		rows: [
			{
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
			},
		],
	}
	// const result = await axios.get("/api/tickets", {
	// 	params: { page: 1, page_size: 10, active: true },
	// })
	// return result.data
}
