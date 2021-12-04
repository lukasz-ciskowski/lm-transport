import Boom from "@hapi/boom";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyError } from "fastify-error";

export function errorHandler(this: FastifyInstance, err: FastifyError, req: FastifyRequest, res: FastifyReply) {    
    if (Boom.isBoom(err)) {
        res.status(err.output.statusCode || 500).send(err)
    } else if (err.validation) {
        res.status(400).send(Boom.badRequest(err.message))
    } else {
        this.log.error(err)
        res.status(500).send(Boom.internal())
    }
}