import moment from "moment"
import { ArrivalsResponse } from "screens/HomeScreen/views/SearchCard/views/BusStopSearch/types"
import { GroupedArrivals } from "./types"

export function arrivalsGroupedByHour(arrivals: ArrivalsResponse["arrivals"], date: Date) {
	return arrivals.reduce<GroupedArrivals>((acc, curr) => {
		const arrivalTime = moment(curr.arrival_time, "HH:mm")
		const hour = arrivalTime.hours()

		if (!acc[hour]) acc[hour] = []
		acc[hour].push({
			id: curr.id,
			route_run: {
				id: curr.route_run.id,
				decorator: curr.route_run.decorator,
			},
			arrival_time: curr.arrival_time,
			active: isArrivalActive(curr.arrival_time, date),
		})
		return acc
	}, {})
}

export function isArrivalActive(arrivalTime: string, date: Date) {
	const momentDate = moment(date)
	const dateDuration = moment.duration({
		hours: momentDate.hours(),
		minutes: momentDate.minutes(),
	})
	const currentDate = new Date()

	const arrivalTimeMoment = moment(arrivalTime, "HH:mm")
	const arrivalDuration = moment.duration({
		hours: arrivalTimeMoment.hours(),
		minutes: arrivalTimeMoment.minutes(),
	})

	if (momentDate.isBefore(currentDate, "day")) return false
	if (momentDate.isAfter(currentDate, "day")) return true
	return arrivalDuration.asMilliseconds() > dateDuration.asMilliseconds()
}
