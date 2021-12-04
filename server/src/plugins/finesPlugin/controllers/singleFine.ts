import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Fine } from "../models/Fine"
import { FineSchema, Schemas } from "../schemas/fineSchema"
import { FineService } from "../services/FineService"

module RequestSchemas {
	export const Params = Type.Object({
		id: Type.Number(),
	})
	export const Response = Type.Object({
		fine: Schemas.Fine
	})
}

export type Params = Static<typeof RequestSchemas.Params>

interface Request {
	Params: Params
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["fines"],
		params: RequestSchemas.Params,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function singleFine(req: FastifyRequest<Request>, res: FastifyReply) {
	const { id } = req.params
	const passengerId = req.authUser.id

	const result = await FineService.getFine(id, passengerId)

	res.code(200).send({ fine: adapt(result) })
}

function adapt(fine: Fine): FineSchema {
	return {
		id: fine.Id,
		fine_price: fine.FinePrice,
		date: fine.Date,
		is_paid: fine.IsPaid,
	}
}
