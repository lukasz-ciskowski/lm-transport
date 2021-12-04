import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { Passenger } from "../models/Passenger"
import { PassengerSchema, Schemas as PassengerSchemas } from "../schemas/passengerSchema"
import { AuthService } from "../services/AuthService"

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["auth"],
		response: {
			200: PassengerSchemas.UserSchema,
		},
	},
}

export async function refresh(
	this: FastifyInstance,
	req: FastifyRequest,
	res: FastifyReply
) {
    const id = req.authUser.id

	const passenger = await AuthService.getById(id)
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
