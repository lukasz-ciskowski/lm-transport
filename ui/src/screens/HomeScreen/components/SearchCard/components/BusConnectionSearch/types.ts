import { SingleArrival } from "../LinesResult/types";

export interface BusConnectionForm {
	fromBusStopId: number
	toBusStopId: number
	date: Date
	time: Date
}

export interface ConnectionsResponse {
	connections: SingleArrival[]
}