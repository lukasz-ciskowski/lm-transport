import { Ticket } from "screens/AccountScreen/models/tickets"

export interface TicketsResponse {
	total: number
	rows: Ticket[]
}
