import axios from "axios"
import moment from "moment"
import { ArrivalsResponse, BusStopSearchForm } from "./types"

export async function findArrivals(data: BusStopSearchForm): Promise<ArrivalsResponse> {
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
				arrival_time: "23:00",
			},
		],
	}
	// const result = await axios.get("/api/timetable/arrivals", {
	// 	params: {
	// 		bus_stop: data.busStopId,
	// 		date: moment(data.date)
	// 			.hours(data.time.getHours())
	// 			.minutes(data.time.getMinutes())
	// 			.startOf("minute")
	// 			.toDate(),
	// 	},
	// })
	// return result.data
}
