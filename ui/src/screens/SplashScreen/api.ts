import axios from "axios"
import { BusLinesResult, RefreshResult } from "./types"

export const refresh = async (): Promise<RefreshResult> => {
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
			{ id: 1, line_number: 128 },
			{ id: 1, line_number: 129 },
		],
	}
	// const result = await axios.get("/api/bus-lines")
	// return result.data
}
