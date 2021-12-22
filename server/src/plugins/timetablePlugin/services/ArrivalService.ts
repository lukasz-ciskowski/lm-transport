import { Schedule } from "../models/Schedule"
import { ArrivalRepository } from "../repositories/ArrivalRepository"

class Service {
	async getByBusStop(busStopId: number, schedule: Schedule, routeId?: number, from?: Date) {
		const arrivalTime = from ? this.dbTime(from) : undefined
		const result = await ArrivalRepository.getByBusStop(
			busStopId,
			schedule.Id,
			routeId,
			arrivalTime
		)
		return result.arrivals
	}

	async getByConnections(
		fromBusStopId: number,
		toBusStopId: number,
		schedule: Schedule,
		routeId?: number,
		from?: Date
	) {
		const arrivalTime = from ? this.dbTime(from) : undefined
		const busStopsFrom = await ArrivalRepository.getByBusStop(
			fromBusStopId,
			schedule.Id,
			routeId,
			arrivalTime
		)
		const busStopsTo = await ArrivalRepository.getByBusStop(
			toBusStopId,
			schedule.Id,
			routeId,
			arrivalTime
		)

		return busStopsFrom.arrivals.filter((from) =>
			busStopsTo.arrivals.find(
				(to) =>
					to.RouteRun.Id === from.RouteRun.Id &&
					from.RouteSchema.FlowOrder < to.RouteSchema.FlowOrder
			)
		)
	}

	async getByRouteRun(routeRunId: number) {
		const result = await ArrivalRepository.getByRouteRun(routeRunId)
		return result.arrivals
	}

	private dbTime(date: Date) {
		const localeSpecificTime = date.toLocaleTimeString()
		return localeSpecificTime.replace(/:\d+ /, " ")
	}
}

export const ArrivalService = new Service()
