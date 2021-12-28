import { BusLineEndpoints } from "../../busLinesPlugin/models/BusLine"
import { BaseBusStop, BusStop } from "./BusStop"
import { DirectionKeys, RouteRun } from "./RouteRun"

export interface Arrival {
	Id: number
	BusStop: BusStop
	RouteRun: RouteRun
	ArrivalTime: string
}

export interface ArrivalByBusStop {
	Id: number
	RouteRun: Omit<RouteRun, "Schedule">
	FirstBusStop: string
	LastBusStop: string
	ArrivalTime: string
}

export interface ArrivalByRouteRun {
	Id: number
	BusStop: BaseBusStop
	ArrivalTime: string
}

export interface AvailableBusStop {
	BusStop: BaseBusStop
	Direction: DirectionKeys
}