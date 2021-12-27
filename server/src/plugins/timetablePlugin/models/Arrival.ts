import { BusStop } from "./BusStop"
import { RouteRun } from "./RouteRun"
import { RouteSchema } from "./RouteSchema"

export interface Arrival {
	Id: number
	RouteSchema: RouteSchema
	RouteRun: RouteRun
	ArrivalTime: string
}

export interface ArrivalByBusStop {
	Id: number
	RouteRun: Pick<RouteRun, "Id">
	RouteSchema: Pick<RouteSchema, "BusLine" | "FlowOrder">
	FromEndpoint: Pick<BusStop, "Id" | "Name">
	ToEndpoint: Pick<BusStop, "Id" | "Name">
	ArrivalTime: string
}

export interface ArrivalByRouteRun {
	Id: number
	RouteSchema: {
		BusStop: BusStop
	}
	ArrivalTime: string
}
