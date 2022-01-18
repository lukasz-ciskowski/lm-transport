import axios from "axios"
import { User } from "models/user"
import { BusLinesResult, DiscountsResult, TicketTypesResult } from "./types"

export const refresh = async (): Promise<User> => {
	return {
		login: "luksik",
		first_name: "lukasz",
		last_name: "lukasz",
		card_number: "luki",
	}

	// const result = await axios.post("/api/refresh")
	// return result.data
}

export async function getBusLines(): Promise<BusLinesResult> {
	return {
		bus_lines: [
			{ id: 1, line_number: 127 },
			{ id: 2, line_number: 128 },
			{ id: 3, line_number: 129 },
		],
	}
	// const result = await axios.get("/api/bus-lines")
	// return result.data
}

export async function getTicketTypes(): Promise<TicketTypesResult> {
	return {
		ticket_types: [
			{ id: 1, name: "Jednorazowy", price: 3 },
			{ id: 2, name: "Tygodniowy", price: 20, static_duration: 5 },
		],
	}
	// const result = await axios.get("/api/ticket-types")
	// return result.data
}

export async function getDiscounts(): Promise<DiscountsResult> {
	return {
		discounts: [{ id: 1, name: "Student", percentage: 51 }],
	}
	// const result = await axios.get("/api/discounts")
	// return result.data
}
