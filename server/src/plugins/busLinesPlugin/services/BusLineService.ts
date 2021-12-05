import { notFound } from "@hapi/boom"
import { BusLineRepository } from "../repositories/BusLineRepository"

class Service {
	async getBusLines() {
		const result = await BusLineRepository.getAll()
		return result.busLines
	}

	async getBusLine(id: number) {
		const result = await BusLineRepository.getById(id)
		if (!result.busLine) throw notFound("Bus line not found")
		return result.busLine
	}
}

export const BusLineService = new Service()
