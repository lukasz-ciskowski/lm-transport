import { Schedule } from "../models/Schedule"
import { ArrivalRepository } from "../repositories/ArrivalRepository"

class Service {
	async getByBusStop(busStopId: number, routeId: number, schedule: Schedule) {
		const result = await ArrivalRepository.getByBusStop(busStopId, routeId, schedule.Id)
		return result.arrivals
	}
}

export const ArrivalService = new Service()
