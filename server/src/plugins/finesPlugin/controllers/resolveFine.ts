import { Static, Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { FineService } from "../services/FineService"

module RequestSchemas {
	export const Params = Type.Object({
		id: Type.Number(),
	})
	export const Response = Type.Object({
		ok: Type.Boolean()
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

export async function resolveFine(req: FastifyRequest<Request>, res: FastifyReply) {
	const { id } = req.params
	const passengerId = req.authUser.id

	const result = await FineService.getFine(id, passengerId)
    await FineService.resolveFine(result)

	res.code(200).send({ ok: true })
}
