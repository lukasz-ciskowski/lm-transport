import { Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"

import { BusStopSchema, Schemas } from "../schemas/busStopSchema"
import { BusStopService } from "../services/BusStopService"
import { BusStop } from "../models/BusStop"

module RequestSchemas {
	export const Response = Type.Object({
		bus_stops: Type.Array(Schemas.BusStop),
	})
}

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["timetable"],
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function allBusStops(req: FastifyRequest, res: FastifyReply) {
	const result = await BusStopService.getAll()

	res.code(200).send({ bus_stops: result.map(adapt) })
}

function adapt(result: BusStop): BusStopSchema {
	return {
		id: result.Id,
		name: result.Name,
		post_code: result.PostCode,
		city: result.City,
		street: result.Street,
		lat: result.Lat,
		lon: result.Lon,
	}
}
