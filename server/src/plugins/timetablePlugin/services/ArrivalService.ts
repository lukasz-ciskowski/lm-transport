import { Schedule } from "../models/Schedule"
import { ArrivalRepository } from "../repositories/ArrivalRepository"
import { RouteRunRepository } from "../repositories/RouteRunRepository"

class Service {
	async getByBusStop(busStopId: number, schedule: Schedule, date: Date) {
		const arrivalTime = this.dbTime(date)
		const result = await ArrivalRepository.getByBusStop(busStopId, schedule.Id, arrivalTime)

		return result.arrivals
	}

	async getByConnections(
		fromBusStopId: number,
		toBusStopId: number,
		schedule: Schedule,
		date: Date
	) {
		const arrivalTime = this.dbTime(date)
		const result = await ArrivalRepository.getByConnection(
			fromBusStopId,
			toBusStopId,
			schedule.Id,
			arrivalTime
		)

		return result.arrivals
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
