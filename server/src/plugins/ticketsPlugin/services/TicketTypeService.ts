import { notFound } from "@hapi/boom"
import { TicketTypeRepository } from "../repositories/TicketTypeRepository"

class Service {
	async getTicketTypes() {
		const result = await TicketTypeRepository.getAll()
		return result.ticketTypes
	}

	async getTicketType(id: number) {
		const result = await TicketTypeRepository.getById(id)
		if (!result.ticketType) throw notFound("Ticket type not found")

		return result.ticketType
	}
}

export const TicketTypeService = new Service()
