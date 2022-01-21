import axios from "axios"
import { TicketsResponse } from "./types"

interface QueryRequest {
	page: number
	page_size: number
}

export const queryActiveTickets = async (query: QueryRequest): Promise<TicketsResponse> => {
	const result = await axios.get("/api/tickets", {
		params: { page: query.page, page_size: query.page_size, active: true },
	})
	return result.data
}
