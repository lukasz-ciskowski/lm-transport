import { notFound } from "@hapi/boom"
import { BusStopRepository } from "../repositories/BusStopRepository"

class Service {
	async getAll() {
		const result = await BusStopRepository.getAll()
		return result.busStops
	}

	async getById(id: number) {
		const result = await BusStopRepository.getById(id)
		if (!result.busStop) throw notFound("Bus stop not found")
		return result.busStop
	}
}

export const BusStopService = new Service()
