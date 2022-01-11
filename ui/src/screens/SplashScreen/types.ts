import { SingleBusLine } from "contexts/GlobalContext/types";

export interface RefreshResult {
	login: string
	first_name: string
	last_name: string
	card_number: string
}

export interface BusLinesResult {
	bus_lines: SingleBusLine[]
}
