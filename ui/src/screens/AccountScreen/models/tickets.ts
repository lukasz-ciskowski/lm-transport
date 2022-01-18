import { SingleBusLine } from "models/busLine"
import { SingleDiscount } from "models/discount"
import { SingleTicketType } from "models/ticketType"

export interface Ticket {
	id: number
	ticket_type: Pick<SingleTicketType, "name" | "price">
	bus_line: SingleBusLine
	start_date: string
	estimated_end_date: string
}

export interface SingleDetailedTicket {
	id: number
	bus_line: SingleBusLine
	ticket_type?: Pick<SingleTicketType, "name" | "price">
	discount?: Pick<SingleDiscount, "name" | "percentage">
	calculated_price: number
	start_date: string
	estimated_end_date: string
	bought_at: string
}