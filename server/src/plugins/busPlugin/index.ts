import { FastifyInstance } from "fastify"
import { singleBus, ROUTE_OPTIONS as SINGLE_BUS_OPTIONS } from "./controllers/singleBus"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/buses/:id", SINGLE_BUS_OPTIONS, singleBus)
	next()
}
