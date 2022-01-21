import axios from "axios"
import moment from "moment"
import { BusConnectionForm, ConnectionsResponse } from "./types"

export async function findConnections(data: BusConnectionForm): Promise<ConnectionsResponse> {
	const result = await axios.get("/api/timetable/connections", {
		params: {
			from_bus_stop: data.fromBusStopId,
			to_bus_stop: data.toBusStopId,
			date: moment(data.date)
				.hours(data.time.getHours())
				.minutes(data.time.getMinutes())
				.startOf("minute")
				.toDate(),
		},
	})
	return result.data
}
