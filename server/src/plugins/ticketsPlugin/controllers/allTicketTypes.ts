import { Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { Schemas, TicketTypeSchema } from "../schemas/ticketTypeSchema"
import { TicketTypeService } from "../services/TicketTypeService"
import { TicketType } from "../models/TicketType"

module RequestSchemas {
	export const Response = Type.Object({
		ticket_types: Type.Array(Schemas.TicketType),
	})
}

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["tickets"],
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function allTicketTypes(req: FastifyRequest, res: FastifyReply) {
	const result = await TicketTypeService.getTicketTypes()
	res.code(200).send({ ticket_types: result.map(adapt) })
}

function adapt(type: TicketType): TicketTypeSchema {
	return {
		id: type.Id,
		name: type.Name,
		price: type.Price,
		static_duration: type.StaticDuration,
	}
}
