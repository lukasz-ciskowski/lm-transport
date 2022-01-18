import { SingleBusLine } from "models/busLine"
import { SingleDiscount } from "models/discount";
import { SingleTicketType } from "models/ticketType";

export interface BusLinesResult {
	bus_lines: SingleBusLine[]
}

export interface TicketTypesResult {
	ticket_types: SingleTicketType[]
}

export interface DiscountsResult {
	discounts: SingleDiscount[]
}