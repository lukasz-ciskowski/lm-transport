import { Static, Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { RegisterSchema, Schemas } from "../schemas/registerSchema"
import { AuthService } from "../services/AuthService"

module RequestSchemas {
	export const Response = Type.Object({
		ok: Type.Boolean(),
	})
}

export type Response = Static<typeof RequestSchemas.Response>

interface Request {
	Body: RegisterSchema
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["auth"],
		body: Schemas.RegisterUser,
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function register(
	this: FastifyInstance,
	req: FastifyRequest<Request>,
	res: FastifyReply
) {
	const { login, password, last_name, first_name, card_number } = req.body
	const hashedPassword = await this.password(password).hash()
	await AuthService.register({ login, password: hashedPassword, first_name, last_name, card_number })

	res.code(200).send({ ok: true })
}
