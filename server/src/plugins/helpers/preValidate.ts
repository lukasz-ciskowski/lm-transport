import {
	FastifyError,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	RouteShorthandOptions,
} from "fastify"
import { RequestRouteOptions } from "../../../types/RouteOptions"

type RouteProps<T> = RouteShorthandOptions | RequestRouteOptions<T>

export function preValidate<T>(routeProps: RouteProps<T>) {
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
