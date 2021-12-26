import fastify, { FastifyError, FastifyInstance, FastifyServerOptions } from "fastify"
import swagger from "fastify-swagger"
import jwt from "fastify-jwt"
import fastifyCookie from "fastify-cookie"
import ConfigService, { HostConfig } from "./ConfigService"
import { errorHandler } from "../handlers/errorHandler"
import jwtDecorator from "../decorators/jwtDecorator"
import passwordDecorator from "../decorators/passwordDecorator"
import auth from "../decorators/authDecorator"

import passengerPlugin from "../plugins/passengerPlugin"
import finePlugin from "../plugins/finesPlugin"
import ticketsPlugin from "../plugins/ticketsPlugin"
import busLinesPlugin from "../plugins/busLinesPlugin"
import timetablePlugin from "../plugins/timetablePlugin"

export class WebService {
	constructor(private readonly _instance: FastifyInstance) {}

	public static configure(serverOptions: FastifyServerOptions) {
		const instance = fastify(serverOptions)
		instance.register(swagger, {
			routePrefix: "/swagger",
			swagger: {
				host: instance.server.address.name,
				schemes: ["http"],
			},
			exposeRoute: true,
		})

		instance.register(jwt, { secret: ConfigService.config.auth.secret })
		instance.register(fastifyCookie as never, {
			secret: ConfigService.config.auth.secret,
			parseOptions: {},
		})

		instance.decorate("getToken", jwtDecorator.getToken(instance))
		instance.decorate("password", passwordDecorator.password(ConfigService.config.auth.salt))

		instance.setErrorHandler(errorHandler)
		instance.register(
			(i: FastifyInstance, _, next: (err?: FastifyError) => void) => {
				instance.decorate("auth", auth(instance.jwt))

				i.register(passengerPlugin)
				i.register(timetablePlugin)
				i.register(finePlugin)
				i.register(ticketsPlugin)
				i.register(busLinesPlugin)
				next()
			},
			{ prefix: "/api" }
		)

		return new WebService(instance)
	}

	public async start(host: HostConfig) {
		const port = process.env.PORT ? parseInt(process.env.PORT) : host.port
		await this._instance.listen(port, host.address)
	}

	public get instance(): FastifyInstance {
		return this._instance
	}

	public close() {
		this._instance.close()
	}
}
