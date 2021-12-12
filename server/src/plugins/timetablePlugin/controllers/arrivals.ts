import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { ScheduleService } from "../services/ScheduleService"
import { ArrivalService } from "../services/ArrivalService"
import { ArrivalByBusStop } from "../models/Arrival"

module RequestSchemas {
	export const Response = Type.Object({
		arrivals: Type.Array(
			Type.Object({
				id: Type.Number(),
				route_run: Type.Object({
					id: Type.Number(),
				}),
				arrival_time: Type.String({ format: "time" }),
			})
		),
	})
	export const QueryString = Type.Object({
		bus_stop: Type.Number(),
		route: Type.Number(),
		date: Type.String({ format: "date-time" }),
	})
}

type QueryString = Static<typeof RequestSchemas.QueryString>
type Response = Static<typeof RequestSchemas.Response>["arrivals"]

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["timetable"],
		querystring: RequestSchemas.QueryString,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

interface Request {
	Querystring: QueryString
}

export async function arrivals(req: FastifyRequest<Request>, res: FastifyReply) {
	const schedule = await ScheduleService.getScheduleByDay(new Date(req.query.date))
	const result = await ArrivalService.getByBusStop(
		req.query.bus_stop,
		req.query.route,
		schedule
	)

	res.code(200).send({ arrivals: result.map(adapt) })
}

function adapt(result: ArrivalByBusStop): Response[number] {
	return {
		id: result.Id,
		arrival_time: result.ArrivalTime,
		route_run: {
			id: result.RouteRun.Id,
		},
	}
}
