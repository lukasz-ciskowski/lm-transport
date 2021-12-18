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
	ArrivalTime: string
}

export interface ArrivalByRouteRun {
	Id: number
	RouteSchema: {
		BusStop: Omit<BusStop, "BusLine">
	}
	ArrivalTime: string
}
