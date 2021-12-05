import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { AuthService } from "../../passengerPlugin/services/AuthService"

import { Schemas as BusLineSchemas } from "../../busLinesPlugin/schemas/busLineSchema"
import { SharedSchemas } from "../../helpers/sharedSchema"
import { TicketService } from "../services/TicketService"
import { QueriedTicket, Ticket } from "../models/Ticket"

module RequestSchemas {
	const Ticket = Type.Object({
		id: Type.Number(),
		bus_line: BusLineSchemas.BusLine,
		start_date: Type.String({ format: "date-time" }),
		estimated_end_date: Type.String({ format: "date-time" }),
	})
	export const Tickets = Type.Array(Ticket)

	export const QueryString = Type.Object({
		page: SharedSchemas.Page,
		page_size: SharedSchemas.PageSize,
		active: Type.Optional(Type.Boolean()),
	})
	export const Response = SharedSchemas.PageResponse(Tickets)
}

export type TicketsSchema = Static<typeof RequestSchemas.Tickets>
export type QueryString = Static<typeof RequestSchemas.QueryString>

interface Request {
	Querystring: QueryString
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["tickets"],
		querystring: RequestSchemas.QueryString,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function tickets(req: FastifyRequest<Request>, res: FastifyReply) {
	const { active, page, page_size } = req.query
	const passengerId = req.authUser.id
	const passengerObject = await AuthService.getById(passengerId)

	const result = await TicketService.queryPassengerTickets(
		passengerObject,
		{
			page,
			size: page_size,
		},
		{ active }
	)
    
	res.code(200).send({ total: result.total, rows: result.rows.map(adapt) })
}

function adapt(result: QueriedTicket): TicketsSchema[number] {
	return {
		id: result.Id,
		bus_line: {
			id: result.BusLine.Id,
			line_number: result.BusLine.LineNumber,
		},
		start_date: result.StartDate,
		estimated_end_date: result.EstimatedEndDate,
	}
}
