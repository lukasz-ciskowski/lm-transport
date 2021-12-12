import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"

import { BusStopSchema, Schemas } from "../schemas/busStopSchema"
import { BusStopService } from "../services/BusStopService"
import { BusStop } from "../models/BusStop"
import { RequestRouteOptions } from "../../../../types/RouteOptions"

module RequestSchemas {
	export const Response = Type.Object({
		bus_stop: Schemas.BusStop,
	})
	export const Params = Type.Object({
		id: Type.Number(),
	})
}

type Params = Static<typeof RequestSchemas.Params>

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["timetable"],
		params: RequestSchemas.Params,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

interface Request {
	Params: Params
}

export async function singleBusStop(req: FastifyRequest<Request>, res: FastifyReply) {
	const result = await BusStopService.getById(req.params.id)

	res.code(200).send({ bus_stop: adapt(result) })
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
