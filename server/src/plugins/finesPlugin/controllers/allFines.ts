import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Fine } from "../models/Fine"
import { FineService } from "../services/FineService"

module RequestSchemas {
	export const Querystring = Type.Object({
		is_paid: Type.Optional(Type.Boolean()),
	})
	export const Fines = Type.Array(
		Type.Object({
			id: Type.Integer(),
			date: Type.String({ format: "date-time" }),
			is_paid: Type.Boolean(),
		})
	)
	export const Response = Type.Object({
		fines: Fines,
	})
}

export type Query = Static<typeof RequestSchemas.Querystring>
export type FinesSchema = Static<typeof RequestSchemas.Fines>

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

function adapt(fine: Fine): FinesSchema[number] {
	return {
		id: fine.Id,
		date: fine.Date,
		is_paid: fine.IsPaid,
	}
}
