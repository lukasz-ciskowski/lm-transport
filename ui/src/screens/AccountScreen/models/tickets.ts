import { SingleBusLine } from "models/busLine"

export interface Ticket {
	id: number
	ticket_type: TicketType
	bus_line: SingleBusLine
	start_date: string
	estimated_end_date: string
}

export interface SingleDetailedTicket {
	id: number
	bus_line: SingleBusLine
	ticket_type?: TicketType
	discount?: Discount
	calculated_price: number
	start_date: string
	estimated_end_date: string
	bought_at: string
}

export interface TicketType {
	name: string
	price: number
}

export interface Discount {
	name: string
	percentage: number
}
