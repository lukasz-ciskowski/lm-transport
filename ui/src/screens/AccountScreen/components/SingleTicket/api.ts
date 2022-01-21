import axios from "axios"
import { RetrieveDetailedTicketResponse } from "./types"

export const getTicketDetails = async (id: number): Promise<RetrieveDetailedTicketResponse> => {
	const result = await axios.get(`/api/tickets/${id}`)
	return result.data
}
