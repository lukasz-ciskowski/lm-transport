import axios from "axios"
import { BusStopsResponse } from "./types"

export async function getBusStops(): Promise<BusStopsResponse> {
	const result = await axios.get("/api/timetable/bus-stops")
	return result.data
}
