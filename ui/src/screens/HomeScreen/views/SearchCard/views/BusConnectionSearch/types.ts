import { SingleArrival } from "models/arrival";

export interface BusConnectionForm {
	fromBusStopId: number
	toBusStopId: number
	date: Date
	time: Date
}

export interface ConnectionsResponse {
	connections: SingleArrival[]
}