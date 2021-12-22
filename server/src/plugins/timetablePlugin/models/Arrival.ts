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
		Route: {
			Id: number
			StartBusStop: Pick<BusStop, "Id" | "Name">
			EndBusStop: Pick<BusStop, "Id" | "Name">
			BusLine: BusLine
		}
	}
	RouteSchema: Pick<RouteSchema, "FlowOrder">
	ArrivalTime: string
}

export interface ArrivalByRouteRun {
	Id: number
	RouteSchema: {
		BusStop: Omit<BusStop, "BusLine">
	}
	ArrivalTime: string
}
