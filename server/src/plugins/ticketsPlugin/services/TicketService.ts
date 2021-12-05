import { PagingRequest } from "../../../../types/Paging"
import { BusLine } from "../../busLinesPlugin/models/BusLine"
import { Passenger } from "../../passengerPlugin/models/Passenger"
import { Discount } from "../models/Discount"
import { TicketType } from "../models/TicketType"
import { TicketRepository } from "../repositories/TicketRepository"

type Filters = { active?: boolean }
class Service {
	async buyTicket(
		startDate: Date,
		passenger: Passenger,
		busLine: BusLine,
		ticketType: TicketType,
		discount?: Discount
	) {
		const calculatedPrice = discount
			? (ticketType.Price * discount.Percentage) / 100
			: ticketType.Price

		const endDate = new Date(startDate)
		endDate.setHours(startDate.getHours() + ticketType.Length)

		const { id } = await TicketRepository.createTicket({
			StartDate: startDate.toISOString(),
			EstimatedEndDate: endDate.toISOString(),
			CalculatedPrice: Number(calculatedPrice.toFixed(2)),
			Passenger: passenger,
			BusLine: busLine,
			TicketType: ticketType,
			Discount: discount,
			BoughtAt: new Date().toISOString(),
		})

		return id
	}

	async queryPassengerTickets(passenger: Passenger, page: PagingRequest, filters: Filters) {
		return await TicketRepository.queryPassengerTickets(passenger.Id, page, filters.active)
	}
}

export const TicketService = new Service()
