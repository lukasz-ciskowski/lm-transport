import { notFound } from "@hapi/boom"
import { DiscountRepository } from "../repositories/DiscountRepository"

class Service {
	async getDiscounts() {
		const result = await DiscountRepository.getAll()
		return result.ticketTypes
	}

	async getDiscount(id: number) {
		const result = await DiscountRepository.getById(id)
		if (!result.ticketType) throw notFound("Discount not found")

		return result.ticketType
	}
}

export const DiscountService = new Service()
