import { FastifyInstance } from "fastify"
import { allBusLines, ROUTE_OPTIONS as ALL_BUS_LINES_OPTIONS } from "./controllers/allBusLines"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/bus-lines", ALL_BUS_LINES_OPTIONS, allBusLines)
	next()
}
