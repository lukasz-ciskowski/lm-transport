import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"

import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { RouteSchemaService, SchemaDirection } from "../services/RouteSchemaService"
import { Schemas as DirectionSchemas } from "../schemas/directionSchema"
import { BusStop } from "../models/BusStop"

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
	export const BusEndpoints = Type.Object({
		direction: DirectionSchemas.Direction,
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
		bus_line: Type.Number(),
		direction: Type.Optional(DirectionSchemas.Direction),
	})
}

type Querystring = Static<typeof RequestSchemas.Querystring>
type BusEndpointsSchema = Static<typeof RequestSchemas.BusEndpoints>
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
	const { bus_line, direction } = req.query

	const result = await RouteSchemaService.getRouteSchemas({
		busLine: bus_line,
		direction: direction,
	})

	res.code(200).send({ routes: result.map(adapt) })
}

function adapt(result: SchemaDirection): BusEndpointsSchema {
	return {
		direction: result.direction,
		start_bus_stop: adaptBusStop(result.endpoints.start),
		end_bus_stop: adaptBusStop(result.endpoints.end),
		schemas: result.schemas.map((schema) => ({
			id: schema.Id,
			flow_order: schema.FlowOrder,
			bus_stop: adaptBusStop(schema.BusStop)
		})),
	}
}

function adaptBusStop(busStop: Pick<BusStop, "Id" | "Name">): BusStopSchema {
	return {
		id: busStop.Id,
		name: busStop.Name,
	}
}
