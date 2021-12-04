import { FastifyInstance } from "fastify"
import { Passenger } from "../plugins/passengerPlugin/models/Passenger"
import ConfigService from "../services/ConfigService"

export interface Token {
	id: number
}

const getToken = (instance: FastifyInstance) => (user: Passenger) => {
	const tokenObj: Token = { id: user.Id }
	const token = instance.jwt.sign(tokenObj, { expiresIn: ConfigService.config.auth.tokenExpiry })

	return token
}

export default {
	getToken,
}

declare module "fastify" {
	export interface FastifyInstance {
		getToken(user: Passenger): string
	}
}
