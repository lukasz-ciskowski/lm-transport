import { FastifyInstance } from "fastify"
import { register, ROUTE_OPTIONS as REGISTER_OPTIONS } from "./controllers/register"
import { login, ROUTE_OPTIONS as LOGIN_OPTIONS } from "./controllers/login"
import { refresh, ROUTE_OPTIONS as REFRESH_OPTIONS } from "./controllers/refresh"
import { preValidate } from "../helpers/preValidate"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.post("/login", LOGIN_OPTIONS, login)
	instance.post("/refresh", preValidate(REFRESH_OPTIONS), refresh)
	instance.post("/register", REGISTER_OPTIONS, register)
	next()
}
