import { badRequest } from "@hapi/boom"
import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { BusLineService } from "../../busLinesPlugin/services/BusLineService"
import { AuthService } from "../../passengerPlugin/services/AuthService"
import { DiscountService } from "../services/DiscountService"
import { TicketService } from "../services/TicketService"
import { TicketTypeService } from "../services/TicketTypeService"

module RequestSchemas {
	export const SingleTicketRequestBody = Type.Object({
		bus_line: Type.Number(),
		start_date: Type.String({ format: "date-time" }),
		ticket_type: Type.Number(),
		discount: Type.Optional(Type.Number()),
	})

	export const SeasonTIcketRequestBody = Type.Object({
		start_date: Type.String({ format: "date-time" }),
		ticket_type: Type.Number(),
		discount: Type.Optional(Type.Number()),
	})
}

export type Body =
	| Static<typeof RequestSchemas.SingleTicketRequestBody>
	| Static<typeof RequestSchemas.SeasonTIcketRequestBody>

interface Request {
	Body: Body
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["tickets"],
		body: {
			oneOf: [RequestSchemas.SingleTicketRequestBody, RequestSchemas.SeasonTIcketRequestBody],
		},
		response: {
			201: Type.Object({ ok: Type.Boolean() }),
		},
	},
}

export async function buyTicket(req: FastifyRequest<Request>, res: FastifyReply) {
	const { ticket_type, discount, start_date } = req.body
	const bus_line = "bus_line" in req.body ? req.body.bus_line : undefined
	const passengerId = req.authUser.id

	const ticketTypeObject = await TicketTypeService.getTicketType(ticket_type)
	const busLineObject = bus_line ? await BusLineService.getBusLine(bus_line) : undefined
	const discountObject = discount ? await DiscountService.getDiscount(discount) : undefined
	const passengerObject = await AuthService.getById(passengerId)

	if (!bus_line && !ticketTypeObject.StaticDuration)
		throw badRequest("This ticket type requires BusLine")
	if (bus_line && ticketTypeObject.StaticDuration)
		throw badRequest("This ticket type does not allow storing BusLine")

	await TicketService.buyTicket(
		new Date(start_date),
		passengerObject,
		ticketTypeObject,
		busLineObject,
		discountObject
	)

	res.code(201).send({ ok: true })
}
