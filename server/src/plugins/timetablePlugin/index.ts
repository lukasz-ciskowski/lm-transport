import { FastifyInstance } from "fastify"
import { allBusStops, ROUTE_OPTIONS as ALL_BUS_STOPS_OPTIONS } from "./controllers/allBusStops"
import {
	singleBusStop,
	ROUTE_OPTIONS as SINGLE_BUS_STOP_OPTIONS,
} from "./controllers/singleBusStop"
import {
	busLineRouteSchema as routeSchemas,
	ROUTE_OPTIONS as ROUTE_SCHEMAS_ROUTE_OPTIONS,
} from "./controllers/routeSchemas"
import { arrivals, ROUTE_OPTIONS as ARRIVALS_ROUTE_OPTIONS } from "./controllers/arrivals"

export default (instance: FastifyInstance, _: any, next: any) => {
	instance.get("/timetable/bus-stops", ALL_BUS_STOPS_OPTIONS, allBusStops)
	instance.get("/timetable/bus-stops/:id", SINGLE_BUS_STOP_OPTIONS, singleBusStop)
	instance.get("/timetable/route-schemas", ROUTE_SCHEMAS_ROUTE_OPTIONS, routeSchemas)
	instance.get("/timetable/arrivals", ARRIVALS_ROUTE_OPTIONS, arrivals)
	next()
}
