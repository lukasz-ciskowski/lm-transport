import { internal, notFound, unauthorized } from "@hapi/boom"
import { PagingRequest } from "../../../../types/Paging"
import { BusLine } from "../../busLinesPlugin/models/BusLine"
import { Passenger } from "../../passengerPlugin/models/Passenger"
import { Discount } from "../models/Discount"
import { TicketType } from "../models/TicketType"
import { TicketRepository } from "../repositories/TicketRepository"
import moment from "moment"

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

		let estimatedStartDate: Date | null = null
		let estimatedEndDate: Date | null = null

		// for the "seasonal" tickets like monthly or weekly
		if (ticketType.StaticDuration) {
			estimatedStartDate = moment(startDate).startOf("D").toDate()
			estimatedEndDate = moment(startDate)
				.add(moment.duration(ticketType.StaticDuration))
				.endOf("D")
				.toDate()
		} else {
			// temporary solution - TODO calculate max length of single busline journey
			estimatedStartDate = startDate
			estimatedEndDate = moment(startDate).add(4, "h").toDate()
		}

		if (!estimatedStartDate || !estimatedEndDate) throw internal("Date parsing error")

		const { id } = await TicketRepository.createTicket({
			StartDate: estimatedStartDate.toISOString(),
			EstimatedEndDate: estimatedEndDate.toISOString(),
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

	async getSingleTicket(id: number, passengerId: number) {
		const result = await TicketRepository.getPassengerTicket(id)
		if (!result.ticket) throw notFound("Ticket not found")
		if (result.ticket.PassengerId !== passengerId) throw notFound("Ticket not found")
		return result.ticket
	}
}

export const TicketService = new Service()
