import { FastifyInstance } from "fastify"
import { preValidate } from "../helpers/preValidate"
import { allFines, ROUTE_OPTIONS as ALL_FINES_OPTIONS } from "./controllers/allFines"
import { singleFine, ROUTE_OPTIONS as SINGLE_FINE_OPTIONS } from "./controllers/singleFine"
import { resolveFine, ROUTE_OPTIONS as RESOLVE_FINE_OPTIONS } from "./controllers/resolveFine"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/fines", preValidate(ALL_FINES_OPTIONS), allFines)
	instance.get("/fines/:id", preValidate(SINGLE_FINE_OPTIONS), singleFine)
	instance.patch("/fines/:id", preValidate(RESOLVE_FINE_OPTIONS), resolveFine)
	next()
}
