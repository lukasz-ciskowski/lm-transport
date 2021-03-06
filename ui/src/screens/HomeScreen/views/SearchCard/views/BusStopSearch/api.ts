import axios from "axios"
import moment from "moment"
import { ArrivalsResponse, BusStopSearchForm } from "./types"

export async function findArrivals(data: BusStopSearchForm): Promise<ArrivalsResponse> {
	const result = await axios.get("/api/timetable/arrivals", {
		params: {
			bus_stop: data.busStopId,
			date: moment(data.date)
				.hours(data.time.getHours())
				.minutes(data.time.getMinutes())
				.startOf("minute")
				.toDate(),
		},
	})
	return result.data
}
