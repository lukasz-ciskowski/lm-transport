import { notFound } from "@hapi/boom"
import { Static, Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { RequestRouteOptions } from "../../../../types/RouteOptions"
import { Passenger } from "../models/Passenger"
import { PassengerSchema, Schemas as PassengerSchemas } from "../schemas/loginResultSchema"
import { SharedSchemas } from "../schemas/shared"
import { AuthService } from "../services/AuthService"

export module Schemas {
	export const LoginUser = Type.Object({
		login: SharedSchemas.Login,
		password: SharedSchemas.Password,
	})
}

export type LoginSchema = Static<typeof Schemas.LoginUser>


interface Request {
	Body: LoginSchema
}

export const ROUTE_OPTIONS: RequestRouteOptions<Request> = {
	schema: {
		tags: ["auth"],
		body: Schemas.LoginUser,
		response: {
			200: PassengerSchemas.PassengerSchema,
		},
	},
}

export async function login(
	this: FastifyInstance,
	req: FastifyRequest<Request>,
	res: FastifyReply
) {
	const { login, password } = req.body
	const passenger = await AuthService.getByLogin(login)

	const passwordValid = this.password(password).verify(passenger.Password)
	if (!passwordValid) throw notFound("Invalid password")

	const token = this.getToken(passenger)

	res.setCookie("token", token, { path: "/" }).code(200).send(adapt(passenger))
}

function adapt(passenger: Passenger): PassengerSchema {
	return {
		login: passenger.Login,
		first_name: passenger.FirstName,
		last_name: passenger.LastName,
		card_number: passenger.CardNumber,
	}
}
