import { notFound } from "@hapi/boom"
import { BusRepository } from "../repositories/BusRepository"

class Service {
	async getBus(id: number) {
		const result = await BusRepository.getById(id)
		if (!result.bus) throw notFound("Bus not found")
		return result.bus
	}
}

export const BusService = new Service()
