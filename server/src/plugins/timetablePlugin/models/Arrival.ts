import { BusLine } from "../../busLinesPlugin/models/BusLine"
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
	RouteRun: {
		Id: number
		BusLine: BusLine
	}
	RouteSchema: Pick<RouteSchema, "FlowOrder" | "Direction">
	FromEndpoint: Pick<BusStop, "Id" | "Name">
	ToEndpoint: Pick<BusStop, "Id" | "Name">
	ArrivalTime: string
}

export interface ArrivalByRouteRun {
	Id: number
	RouteSchema: {
		BusStop: Omit<BusStop, "BusLine">
	}
	ArrivalTime: string
}
