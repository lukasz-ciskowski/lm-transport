import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Fines } from "../models/Fines"
import { FinesSchema, Schemas } from "../schemas/finesSchema"
import { FineService } from "../services/FineService"

module RequestSchemas {
	export const Querystring = Type.Object({
		is_paid: Type.Optional(Type.Boolean()),
	})
	export const Response = Type.Object({
		fines: Schemas.Fines
	})
}

export type Query = Static<typeof RequestSchemas.Querystring>

interface Request {
	Querystring: Query
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["fines"],
		querystring: RequestSchemas.Querystring,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function allFines(req: FastifyRequest<Request>, res: FastifyReply) {
	const { is_paid } = req.query
	const passengerId = req.authUser.id

	const result = await FineService.getFines(passengerId, is_paid)

	res.code(200).send({ fines: result.map(adapt) })
}

function adapt(fine: Fines[number]): FinesSchema[number] {
	return {
		id: fine.Id,
		date: fine.Date,
		is_paid: fine.IsPaid,
	}
}
