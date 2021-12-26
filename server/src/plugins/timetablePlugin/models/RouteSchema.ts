import { BusStop } from "./BusStop"

export interface RouteSchema {
	Id: number
	BusStop: BusStop
	FlowOrder: number
	Direction: DirectionKeys
}

export interface RouteSchemasQuery {
	Id: number
	BusStop: Pick<BusStop, "Id" | "Name">
	FlowOrder: number
	Direction: DirectionKeys
}

export enum DirectionKeys {
	"Forwards",
	"Backwards",
}
