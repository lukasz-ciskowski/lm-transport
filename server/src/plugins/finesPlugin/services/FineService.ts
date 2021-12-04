import { badRequest, notFound, unauthorized } from "@hapi/boom"
import { Fine } from "../models/Fine"
import { FineRepository } from "../repositories/FineRepository"

class Service {
	async getFines(passengerId: number, isPaid?: boolean) {
		const result = await FineRepository.getFines(passengerId, isPaid)
		return result.fines
	}

	async getFine(id: number, passengerId: number) {
		const result = await FineRepository.getFine(id)
		if (!result.fine) throw notFound("Fine not found")
		if (result.fine.PassengerId !== passengerId) throw unauthorized("No access to this fine")

		return result.fine
	}

	async resolveFine(fine: Fine) {
		if (fine.IsPaid) throw badRequest("This fine was already paid")
		return await FineRepository.resolveFine(fine)
	}
}

export const FineService = new Service()
