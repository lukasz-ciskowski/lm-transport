import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"

import { Schemas as BusLineSchemas } from "../../busLinesPlugin/schemas/busLineSchema"
import { TicketService } from "../services/TicketService"
import { SingleTicket } from "../models/Ticket"

module RequestSchemas {
	export const Ticket = Type.Object({
		id: Type.Number(),
		bus_line: Type.Optional(BusLineSchemas.BusLine),
		ticket_type: Type.Object({
			name: Type.String(),
			price: Type.Number(),
		}),
		discount: Type.Optional(
			Type.Object({
				name: Type.String(),
				percentage: Type.Number(),
			})
		),
		calculated_price: Type.Number(),
		start_date: Type.String({ format: "date-time" }),
		estimated_end_date: Type.String({ format: "date-time" }),
		bought_at: Type.String({ format: "date-time" }),
	})
	export const Response = Type.Object({ ticket: Ticket })
	export const Params = Type.Object({
		id: Type.Number(),
	})
}

export type TicketSchema = Static<typeof RequestSchemas.Ticket>
export type Params = Static<typeof RequestSchemas.Params>

interface Request {
	Params: Params
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["tickets"],
		params: RequestSchemas.Params,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function singleTicket(req: FastifyRequest<Request>, res: FastifyReply) {
	const { id } = req.params
	const passengerId = req.authUser.id

	const result = await TicketService.getSingleTicket(id, passengerId)
	res.code(200).send({ ticket: adapt(result) })
}

function adapt(result: SingleTicket): TicketSchema {
	return {
		id: result.Id,
		bus_line: result.BusLine
			? {
					id: result.BusLine.Id,
					line_number: result.BusLine.LineNumber,
			  }
			: undefined,
		discount: result.Discount
			? {
					name: result.Discount.Name,
					percentage: result.Discount.Percentage,
			  }
			: undefined,
		ticket_type: {
			name: result.TicketType.Name,
			price: result.TicketType.Price,
		},
		calculated_price: result.CalculatedPrice,
		bought_at: result.BoughtAt,
		start_date: result.StartDate,
		estimated_end_date: result.EstimatedEndDate,
	}
}
