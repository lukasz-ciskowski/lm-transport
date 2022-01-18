import axios from "axios"
import { TicketsResponse } from "./types"

interface QueryRequest {
	page: number
	page_size: number
}

export const queryHistoricalTickets = async (query: QueryRequest): Promise<TicketsResponse> => {
	return {
		total: 12,
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
	// 	params: { page: query.page, page_size: query.page_size, active: false },
	// })
	// return result.data
}
