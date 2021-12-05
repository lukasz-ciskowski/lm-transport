import { Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { BusLine } from "../models/BusLine"
import { BusLineSchema, Schemas } from "../schemas/busLineSchema"
import { BusLineService } from "../services/BusLineService"

module RequestSchemas {
	export const Response = Type.Object({
		bus_lines: Type.Array(Schemas.BusLine),
	})
}

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["bus-lines"],
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function allBusLines(req: FastifyRequest, res: FastifyReply) {
	const result = await BusLineService.getBusLines()
	res.code(200).send({ bus_lines: result.map(adapt) })
}

function adapt(busLine: BusLine): BusLineSchema {
	return {
		id: busLine.Id,
        line_number: busLine.LineNumber
	}
}
