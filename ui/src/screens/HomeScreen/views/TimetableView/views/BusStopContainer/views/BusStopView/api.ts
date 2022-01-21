import axios from "axios"
import { Directions } from "common/Directions"
import moment from "moment"
import { ArrivalsResponse } from "./types"

export async function getRouteArrivals(data: {
	busStop: number
	date: Date
	direction: Directions
}): Promise<ArrivalsResponse> {
	const result = await axios.get("/api/timetable/arrivals", {
		params: {
			bus_stop: data.busStop,
			date: moment(data.date).startOf("day").utc(true).toDate(),
			direction: data.direction,
		},
	})
	return result.data
}
