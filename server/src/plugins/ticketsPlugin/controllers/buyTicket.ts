import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { BusLineService } from "../../busLinesPlugin/services/BusLineService"
import { AuthService } from "../../passengerPlugin/services/AuthService"
import { DiscountService } from "../services/DiscountService"
import { TicketService } from "../services/TicketService"
import { TicketTypeService } from "../services/TicketTypeService"

module RequestSchemas {
	export const RequestBody = Type.Object({
		bus_line: Type.Number(),
		start_date: Type.String({ format: "date-time" }),
		ticket_type: Type.Number(),
		discount: Type.Optional(Type.Number()),
	})
}

export type Body = Static<typeof RequestSchemas.RequestBody>

interface Request {
	Body: Body
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["tickets"],
		body: RequestSchemas.RequestBody,
		response: {
			201: Type.Object({ ok: Type.Boolean() }),
		},
	},
}

export async function buyTicket(req: FastifyRequest<Request>, res: FastifyReply) {
	const { bus_line, ticket_type, discount, start_date } = req.body
	const passengerId = req.authUser.id

	const ticketTypeObject = await TicketTypeService.getTicketType(ticket_type)
	const busLineObject = await BusLineService.getBusLine(bus_line)
	const discountObject = discount ? await DiscountService.getDiscount(discount) : undefined
	const passengerObject = await AuthService.getById(passengerId)

	await TicketService.buyTicket(
		new Date(start_date),
		passengerObject,
		busLineObject,
		ticketTypeObject,
		discountObject
	)

	res.code(201).send({ ok: true })
}
