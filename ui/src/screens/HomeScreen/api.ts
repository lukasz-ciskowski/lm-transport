import axios from "axios"
import { BusStopsResponse } from "./types"

export async function getBusStops(): Promise<BusStopsResponse> {
	return {
		bus_stops: [
			{
				id: 1,
				name: "Galeria bałtycka",
				street: "a",
				post_code: "1",
				city: "a",
				lat: 0,
				lon: 0,
			},
			{
				id: 2,
				name: "Zaspa SKM",
				street: "a",
				post_code: "1",
				city: "a",
				lat: 0,
				lon: 0,
			},
		],
	}
	// const result = await axios.get("/api/timetable/bus-stops")
	// return result.data
}
