import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { RequestRouteOptions } from "../../../types/RouteOptions"

export function preValidate<T extends RouteShorthandOptions | RequestRouteOptions<any>>(
	routeProps: T
) {
	return {
		...routeProps,
		preValidation(
			this: FastifyInstance,
			req: FastifyRequest,
			res: FastifyReply,
			next: (err?: Error) => void
		) {
			this.auth.validate(req, res, next)
		},
	}
}
