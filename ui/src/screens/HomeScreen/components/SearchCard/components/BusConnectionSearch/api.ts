import axios from "axios"
import moment from "moment"
import { BusConnectionForm, ConnectionsResponse } from "./types"

export async function findConnections(data: BusConnectionForm): Promise<ConnectionsResponse> {
	return {
		connections: [
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
	// 		from_bus_stop: data.fromBusStopId,
	// 		to_bus_stop: data.toBusStopId,
	// 		date: moment(data.date)
	// 			.hours(data.time.getHours())
	// 			.minutes(data.time.getMinutes())
	// 			.startOf("minute")
	// 			.toDate(),
	// 	},
	// })
	// return result.data
}
