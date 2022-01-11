import { SingleArrival } from "../LinesResult/types";

export interface BusStopSearchForm {
	busStopId: number
	date: Date
	time: Date
}

export interface ArrivalsResponse {
	arrivals: SingleArrival[]
}