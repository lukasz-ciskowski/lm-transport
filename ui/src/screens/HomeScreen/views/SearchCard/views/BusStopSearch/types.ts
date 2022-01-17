import { SingleArrival } from "models/arrival";

export interface BusStopSearchForm {
	busStopId: number
	date: Date
	time: Date
}

export interface ArrivalsResponse {
	arrivals: SingleArrival[]
}