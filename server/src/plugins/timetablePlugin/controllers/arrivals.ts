import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { ScheduleService } from "../services/ScheduleService"
import { ArrivalService } from "../services/ArrivalService"
import { ArrivalByBusStop } from "../models/Arrival"
import { Schemas as BusLineSchemas } from "../../busLinesPlugin/schemas/busLineSchema"
import { Schemas as DirectionSchemas } from "../schemas/directionSchema"
import { BusStop } from "../models/BusStop"

module RequestSchemas {
	export const BusStop = Type.Object({
		id: Type.Number(),
		name: Type.String(),
	})

	export const Response = Type.Object({
		arrivals: Type.Array(
			Type.Object({
				id: Type.Number(),
				from_endpoint: BusStop,
				to_endpoint: BusStop,
				route_run: Type.Object({
					id: Type.Number(),
					bus_line: BusLineSchemas.BusLine,
				}),
				arrival_time: Type.String({ format: "time" }),
			})
		),
	})
	export const QueryString = Type.Object({
		bus_stop: Type.Number(),
		direction: Type.Optional(DirectionSchemas.Direction),
		show_past: Type.Optional(Type.Boolean()),
		date: Type.String({ format: "date-time" }),
	})
}

type QueryString = Static<typeof RequestSchemas.QueryString>
type BusStopSchema = Static<typeof RequestSchemas.BusStop>
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
		req.query.direction,
		dateObj
	)

	res.code(200).send({ connections: result.map(adapt) })
}

function adapt(result: ArrivalByBusStop): Response[number] {
	return {
		id: result.Id,
		arrival_time: result.ArrivalTime,
		from_endpoint: adaptBusStop(result.FromEndpoint),
		to_endpoint: adaptBusStop(result.ToEndpoint),
		route_run: {
			id: result.RouteRun.Id,
			bus_line: {
				id: result.RouteRun.BusLine.Id,
				line_number: result.RouteRun.BusLine.LineNumber,
			},
		},
	}
}

function adaptBusStop(busStop: Pick<BusStop, "Id" | "Name">): BusStopSchema {
	return {
		id: busStop.Id,
		name: busStop.Name,
	}
}
