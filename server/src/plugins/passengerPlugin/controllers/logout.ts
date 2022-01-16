import { Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["auth"],
		response: {
			200: Type.Object({ id: Type.Number() }),
		},
	},
}

export async function logout(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
	const { id } = req.authUser

	res.setCookie("token", "", { path: "/", expires: new Date(1) })
		.code(200)
		.send({ id: id })
}