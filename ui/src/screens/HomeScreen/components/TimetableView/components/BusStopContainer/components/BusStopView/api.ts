import axios from "axios"
import { Directions } from "common/Directions"
import { ArrivalsResponse } from "screens/HomeScreen/components/SearchCard/components/BusStopSearch/types"

export async function getRouteArrivals(data: {
	busStop: number
	date: Date
	direction: Directions
}): Promise<ArrivalsResponse> {
	return {
		arrivals: [
			{
				id: 1,
				first_stop: "Wrzeszcz",
				last_stop: "Zaspa",
				route_run: {
					id: 1,
					bus_line: {
						id: 1,
						line_number: 127,
					},
				},
				arrival_time: "8:00",
			},
			{
				id: 1,
				first_stop: "Wrzeszcz",
				last_stop: "Zaspa",
				route_run: {
					id: 1,
					bus_line: {
						id: 1,
						line_number: 127,
					},
				},
				arrival_time: "8:10",
			},
			{
				id: 1,
				first_stop: "Wrzeszcz",
				last_stop: "Zaspa",
				route_run: {
					id: 1,
					bus_line: {
						id: 1,
						line_number: 127,
					},
				},
				arrival_time: "19:17",
			},
		],
	}
	// const result = await axios.get("/api/timetable/arrivals", {
	// 	params: { bus_stop: data.busStop, date: data.date, direction: data.direction },
	// })
	// return result.data
}