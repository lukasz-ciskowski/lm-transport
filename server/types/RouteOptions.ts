import { RouteShorthandOptions } from "fastify"
import { IncomingMessage, Server, ServerResponse } from "http"

export type RequestRouteOptions<T> = RouteShorthandOptions<
	Server,
	IncomingMessage,
	ServerResponse,
	T
>
