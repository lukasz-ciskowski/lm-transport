import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { ArrivalService } from "../services/ArrivalService"
import { ArrivalByRouteRun } from "../models/Arrival"
import { Schemas as BusStopSchemas } from "../schemas/busStopSchema"
import { Schemas as RunDecoratorSchemas } from "../schemas/runDecorator"

module RequestSchemas {
	export const Response = Type.Object({
		run: Type.Object({
			id: Type.Number(),
			decorator: Type.Optional(RunDecoratorSchemas.RunDecorator),
		}),
		arrivals: Type.Array(
			Type.Object({
				id: Type.Number(),
				bus_stop: BusStopSchemas.BaseBusStop,
				arrival_time: Type.String({ format: "time" }),
			})
		),
	})
	export const Params = Type.Object({
		id: Type.Number(),
	})
}

type Params = Static<typeof RequestSchemas.Params>
type Response = Static<typeof RequestSchemas.Response>["arrivals"]

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

export async function routeRun(req: FastifyRequest<Request>, res: FastifyReply) {
	const result = await ArrivalService.getByRouteRun(req.params.id)

	res.code(200).send({
		run: {
			id: result.routeRun.Id,
			decorator: result.routeRun.RunDecoration
				? {
						name: result.routeRun.RunDecoration?.Name,
						prefix: result.routeRun.RunDecoration?.Prefix,
				  }
				: undefined,
		},
		arrivals: result.arrivals.map(arrivalsAdapt),
	})
}

function arrivalsAdapt(result: ArrivalByRouteRun): Response[number] {
	return {
		id: result.Id,
		arrival_time: result.ArrivalTime,
		bus_stop: {
			id: result.BusStop.Id,
			name: result.BusStop.Name,
		},
	}
}
