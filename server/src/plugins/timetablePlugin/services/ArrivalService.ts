import { DirectionKeys } from "../models/RouteSchema"
import { Schedule } from "../models/Schedule"
import { ArrivalRepository } from "../repositories/ArrivalRepository"
import { RouteRunRepository } from "../repositories/RouteRunRepository"

class Service {
	async getByBusStop(busStopId: number, schedule: Schedule, direction?: DirectionKeys, from?: Date) {
		const arrivalTime = from ? this.dbTime(from) : undefined
		const result = await ArrivalRepository.getByBusStop(
			busStopId,
			schedule.Id,
			direction,
			arrivalTime
		)
		return result.arrivals
	}

	async getByConnections(
		fromBusStopId: number,
		toBusStopId: number,
		schedule: Schedule,
		direction?: DirectionKeys,
		from?: Date
	) {
		const arrivalTime = from ? this.dbTime(from) : undefined
		const busStopsFrom = await ArrivalRepository.getByBusStop(
			fromBusStopId,
			schedule.Id,
			direction,
			arrivalTime
		)
		const busStopsTo = await ArrivalRepository.getByBusStop(
			toBusStopId,
			schedule.Id,
			direction,
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
		const arrivalResult = await ArrivalRepository.getByRouteRun(routeRunId)
		const decoratorResult = await RouteRunRepository.getRouteRunWithDecoration(routeRunId)
		return { arrivals: arrivalResult.arrivals, routeRun: decoratorResult.run }
	}

	private dbTime(date: Date) {
		const localeSpecificTime = date.toLocaleTimeString()
		return localeSpecificTime.replace(/:\d+ /, " ")
	}
}

export const ArrivalService = new Service()
