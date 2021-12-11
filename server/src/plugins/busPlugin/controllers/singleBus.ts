import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Bus } from "../models/Bus"
import { BusSchema, Schemas } from "../schemas/busSchema"
import { BusService } from "../services/BusService"

module RequestSchemas {
	export const QueryString = Type.Object({
		id: Type.Number(),
	})
	export const Response = Type.Object({
		bus: Schemas.Bus,
	})
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["buses"],
		querystring: RequestSchemas.QueryString,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export type QueryString = Static<typeof RequestSchemas.QueryString>

interface Request {
	Querystring: QueryString
}

export async function singleBus(req: FastifyRequest<Request>, res: FastifyReply) {
	const result = await BusService.getBus(req.query.id)
	console.log(result);
	
	res.code(200).send({ bus: adapt(result) })
}

function adapt(bus: Bus): BusSchema {
	return {
		id: bus.Id,
		plate: bus.Plate,
		assigned_driver: {
			id: bus.AssignedDriver.Id,
			first_name: bus.AssignedDriver.FirstName,
			last_name: bus.AssignedDriver.LastName,
		},
		bus_line: {
			id: bus.BusLine.Id,
			line_number: bus.BusLine.LineNumber,
		},
	}
}
