import axios from "axios"
import { User } from "models/user"
import { BusLinesResult, DiscountsResult, TicketTypesResult } from "./types"

export const refresh = async (): Promise<User> => {
	const result = await axios.post("/api/refresh")
	return result.data
}

export async function getBusLines(): Promise<BusLinesResult> {
	const result = await axios.get("/api/bus-lines")
	return result.data
}

export async function getTicketTypes(): Promise<TicketTypesResult> {
	const result = await axios.get("/api/ticket-types")
	return result.data
}

export async function getDiscounts(): Promise<DiscountsResult> {
	const result = await axios.get("/api/discounts")
	return result.data
}
