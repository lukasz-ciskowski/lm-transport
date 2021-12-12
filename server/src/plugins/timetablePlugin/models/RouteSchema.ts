import { BusLine } from "../../busLinesPlugin/models/BusLine"
import { BusStop } from "./BusStop"
import { Route } from "./Route"

export interface RouteSchema {
	Id: number
	BusStop: BusStop
	Route: Route
	FlowOrder: number
}

export interface RouteSchemasQuery {
	Id: number
	BusStop: Pick<BusStop, "Id" | "Name">
	Route: {
		Id: number
		StartBusStop: Pick<BusStop, "Id" | "Name">
		EndBusStop: Pick<BusStop, "Id" | "Name">
	}
	FlowOrder: number
}