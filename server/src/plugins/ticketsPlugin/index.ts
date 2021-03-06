import { FastifyInstance } from "fastify"
import { preValidate } from "../helpers/preValidate"
import { allDiscounts, ROUTE_OPTIONS as ALL_DISCOUNTS_OPTIONS } from "./controllers/allDiscounts"
import { allTicketTypes, ROUTE_OPTIONS as ALL_TICKET_TYPES_OPTIONS } from "./controllers/allTicketTypes"
import { buyTicket, ROUTE_OPTIONS as BUY_TICKET_OPTIONS } from "./controllers/buyTicket"
import { allTickets, ROUTE_OPTIONS as TICKETS_OPTIONS } from "./controllers/allTickets"
import { singleTicket, ROUTE_OPTIONS as SINGLE_TICKET_OPTIONS } from "./controllers/singleTicket"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/ticket-types", ALL_TICKET_TYPES_OPTIONS, allTicketTypes)
	instance.get("/discounts", ALL_DISCOUNTS_OPTIONS, allDiscounts)
	instance.post("/tickets", preValidate(BUY_TICKET_OPTIONS), buyTicket)
	instance.get("/tickets", preValidate(TICKETS_OPTIONS), allTickets)
	instance.get("/tickets/:id", preValidate(SINGLE_TICKET_OPTIONS), singleTicket)
	next()
}
