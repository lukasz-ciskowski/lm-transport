import Boom from "@hapi/boom"
import { FastifyRequest, FastifyReply } from "fastify"
import { JWT } from "fastify-jwt"
import { Token } from "./jwtDecorator"
import cookie from "cookie"

type TokenRequest = Token | null
type Request = (request: FastifyRequest, reply: FastifyReply, next: (err?: Error) => void) => void
type VerifyTokenRequest = (
	request: FastifyRequest,
	reply: FastifyReply,
	next: (err?: Error) => void
) => void

const auth = (jwt: JWT) => {
	const verifyTokens: VerifyTokenRequest = async (request, reply, next) => {
		try {
			if (!request.headers.cookie) throw new Error("Missing token")
			const { token } = cookie.parse(request.headers.cookie)
			await jwt.verify(token)

			const decodedToken: TokenRequest = await jwt.decode(token)
			if (!decodedToken) throw new Error("Token not provided")
			request.authUser = decodedToken
			next()
		} catch (error) {
			next(Boom.unauthorized((error as Error).message ?? "Authorization failed"))
		}
	}
	const validate: Request = async (req, rep, next) => {
		verifyTokens(req, rep, next)
	}

	return {
		validate,
	}
}

export default auth

declare module "fastify" {
	export interface FastifyInstance {
		auth: {
			validate: Request
		}
	}

	export interface FastifyRequest {
		authUser: Token
	}
}
