import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Schemas as BusStopSchemas, BaseBusStopSchema } from "../schemas/busStopSchema"
import { BaseBusStop } from "../models/BusStop"
import { ArrivalService } from "../services/ArrivalService"

module RequestSchemas {
	export const Response = Type.Object({
		routes: Type.Tuple(
			[Type.Array(BusStopSchemas.BaseBusStop), Type.Array(BusStopSchemas.BaseBusStop)],
			{
				description: "Index means the direction 0-Forward, 1-Backwards",
			}
		),
	})
	export const Querystring = Type.Object({
		bus_line: Type.Number(),
	})
}

type Querystring = Static<typeof RequestSchemas.Querystring>

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["timetable"],
		querystring: RequestSchemas.Querystring,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

interface Request {
	Querystring: Querystring
}

export async function busLineRouteSchema(req: FastifyRequest<Request>, res: FastifyReply) {
	const { bus_line } = req.query

	const result = await ArrivalService.getRouteSchema(bus_line)

	res.code(200).send({ routes: result.map((busStops) => busStops.map(adaptBusStop)) })
}

function adaptBusStop(busStop: BaseBusStop): BaseBusStopSchema {
	return {
		id: busStop.Id,
		name: busStop.Name,
	}
}
