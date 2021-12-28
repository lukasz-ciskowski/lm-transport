import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { ScheduleService } from "../services/ScheduleService"
import { ArrivalService } from "../services/ArrivalService"
import { ArrivalByBusStop } from "../models/Arrival"
import { Schemas as BusLineSchemas } from "../../busLinesPlugin/schemas/busLineSchema"
import { Schemas as RunDecoratorSchemas } from "../schemas/runDecorator"
import { Schemas as DirectionSchemas } from "../schemas/directionSchema"

module RequestSchemas {
	export const Response = Type.Object({
		arrivals: Type.Array(
			Type.Object({
				id: Type.Number(),
				first_stop: Type.String(),
				last_stop: Type.String(),
				route_run: Type.Object({
					id: Type.Number(),
					bus_line: BusLineSchemas.BusLine,
					decorator: Type.Optional(RunDecoratorSchemas.RunDecorator),
				}),
				arrival_time: Type.String({ format: "time" }),
			})
		),
	})
	export const QueryString = Type.Object({
		bus_stop: Type.Number(),
		date: Type.String({ format: "date-time" }),
		direction: Type.Optional(DirectionSchemas.Direction),
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
	const dateObj = new Date(req.query.date)
	const schedule = await ScheduleService.getScheduleByDay(dateObj)
	const result = await ArrivalService.getByBusStop(
		req.query.bus_stop,
		schedule,
		dateObj,
		req.query.direction
	)

	res.code(200).send({ arrivals: result.map(adapt) })
}

function adapt(result: ArrivalByBusStop): Response[number] {
	return {
		id: result.Id,
		arrival_time: result.ArrivalTime,
		first_stop: result.FirstBusStop,
		last_stop: result.LastBusStop,
		route_run: {
			id: result.RouteRun.Id,
			decorator: result.RouteRun.RunDecoration
				? {
						name: result.RouteRun.RunDecoration?.Name,
						prefix: result.RouteRun.RunDecoration?.Prefix,
				  }
				: undefined,
			bus_line: {
				id: result.RouteRun.BusLine.Id,
				line_number: result.RouteRun.BusLine.LineNumber,
			},
		},
	}
}
