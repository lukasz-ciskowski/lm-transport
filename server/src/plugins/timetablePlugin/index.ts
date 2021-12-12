import { FastifyInstance } from "fastify"
import { allBusStops, ROUTE_OPTIONS as ALL_BUS_STOPS_OPTIONS } from "./controllers/allBusStops"
import {
	singleBusStop,
	ROUTE_OPTIONS as SINGLE_BUS_STOP_OPTIONS,
} from "./controllers/singleBusStop"
import {
	busLineRouteSchema,
	ROUTE_OPTIONS as SINGLE_BUS_LINE_ROUTE_OPTIONS,
} from "./controllers/routeSchemas"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/timetable/bus-stops", ALL_BUS_STOPS_OPTIONS, allBusStops)
	instance.get("/timetable/bus-stops/:id", SINGLE_BUS_STOP_OPTIONS, singleBusStop)

	instance.get("/timetable/route-schemas", SINGLE_BUS_LINE_ROUTE_OPTIONS, busLineRouteSchema)
	next()
}
