import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { ScheduleService } from "../services/ScheduleService"
import { ArrivalService } from "../services/ArrivalService"
import { ArrivalByBusStop } from "../models/Arrival"
import { Schemas as BusLineSchemas } from "../../busLinesPlugin/schemas/busLineSchema"

module RequestSchemas {
	const endpointBusStop = Type.Object({
		id: Type.Number(),
		name: Type.String(),
	})

	export const Response = Type.Object({
		connections: Type.Array(
			Type.Object({
				id: Type.Number(),
				route_run: Type.Object({
					id: Type.Number(),
					start_bus_stop: endpointBusStop,
					end_bus_stop: endpointBusStop,
					bus_line: BusLineSchemas.BusLine,
				}),
				arrival_time: Type.String({ format: "time" }),
			})
		),
	})
	export const QueryString = Type.Object({
		from_bus_stop: Type.Number(),
        to_bus_stop: Type.Number(),
		route: Type.Optional(Type.Number()),
		show_past: Type.Optional(Type.Boolean()),
		date: Type.String({ format: "date-time" }),
	})
}

type QueryString = Static<typeof RequestSchemas.QueryString>
type Response = Static<typeof RequestSchemas.Response>["connections"]

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

export async function connections(req: FastifyRequest<Request>, res: FastifyReply) {
	const dateObj = new Date(req.query.date)
	const schedule = await ScheduleService.getScheduleByDay(dateObj)
	const result = await ArrivalService.getByConnections(
		req.query.from_bus_stop,
        req.query.to_bus_stop,
		schedule,
		req.query.route,
		dateObj
	)

	res.code(200).send({ connections: result.map(adapt) })
}

function adapt(result: ArrivalByBusStop): Response[number] {
	return {
		id: result.Id,
		arrival_time: result.ArrivalTime,
		route_run: {
			id: result.RouteRun.Id,
			start_bus_stop: {
				id: result.RouteRun.Route.StartBusStop.Id,
				name: result.RouteRun.Route.StartBusStop.Name,
			},
			end_bus_stop: {
				id: result.RouteRun.Route.EndBusStop.Id,
				name: result.RouteRun.Route.EndBusStop.Name,
			},
			bus_line: {
				id: result.RouteRun.Route.BusLine.Id,
				line_number: result.RouteRun.Route.BusLine.LineNumber,
			},
		},
	}
}
