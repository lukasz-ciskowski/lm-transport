import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { RouteSchemaService } from "../services/RouteSchemaService"
import { RouteSchemasQuery } from "../models/RouteSchema"
import { BusStop } from "../models/BusStop"
import { badRequest } from "@hapi/boom"

module RequestSchemas {
	export const BusStop = Type.Object({
		id: Type.Number(),
		name: Type.String(),
	})
	export const RouteSchema = Type.Object({
		id: Type.Number(),
		bus_stop: BusStop,
		flow_order: Type.Number(),
	})
	const BusEndpoints = Type.Object({
		id: Type.Number(),
		start_bus_stop: BusStop,
		end_bus_stop: BusStop,
		schemas: Type.Array(RouteSchema),
	})
	export const Response = Type.Object({
		routes: Type.Array(BusEndpoints, {
			minItems: 1,
			maxItems: 2,
			description:
				"Where one or two arrays contains the same schema definitions but second is reversed",
		}),
	})
	export const Querystring = Type.Object({
		bus_line_id: Type.Optional(Type.Number()),
		route_id: Type.Optional(Type.Number()),
	})
	Type.Pick
}

type Querystring = Static<typeof RequestSchemas.Querystring>
type RouteSchema = Static<typeof RequestSchemas.RouteSchema>
type ResponseSchemas = Static<typeof RequestSchemas.Response>["routes"]
type BusStopSchema = Static<typeof RequestSchemas.BusStop>

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
	const { bus_line_id, route_id } = req.query
	if (!bus_line_id && !route_id) throw badRequest("No parameter defined")
	if (bus_line_id && route_id) throw badRequest("Request limited to one parameter")

	const result = await RouteSchemaService.getRouteSchemas({
		busLineId: bus_line_id,
		routeId: route_id,
	})

	const schemasCollection = result.reduce<ResponseSchemas>((acc, curr) => {
		const endpoint = acc.find(
			(endpoint) => endpoint.start_bus_stop.id === curr.Route.StartBusStop.Id
		)
		if (!endpoint) {
			acc.push(
				{
					id: curr.Route.Id,
					start_bus_stop: busStopAdapt(curr.Route.StartBusStop),
					end_bus_stop: busStopAdapt(curr.Route.EndBusStop),
					schemas: [adapt(curr)]
				}
			)
		} else {
			endpoint.schemas.push(adapt(curr))
		}
		return acc
	}, [])

	res.code(200).send({ routes: schemasCollection })
}

function adapt(result: RouteSchemasQuery): RouteSchema {
	return {
		id: result.Id,
		bus_stop: {
			id: result.BusStop.Id,
			name: result.BusStop.Name,
		},
		flow_order: result.FlowOrder,
	}
}

function busStopAdapt(result: Pick<BusStop, "Id" | "Name">): BusStopSchema {
	return {
		id: result.Id,
		name: result.Name,
	}
}
