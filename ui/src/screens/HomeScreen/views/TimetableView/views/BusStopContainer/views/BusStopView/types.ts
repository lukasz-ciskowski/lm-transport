import { SingleArrival } from "models/arrival";

export type GroupedArrivals = Record<
	number,
	Array<{
		id: number
		route_run: {
			id: number
			decorator?: {
				name: string
				prefix: string
			}
		}
		arrival_time: string
		active: boolean
	}>
>

export interface ArrivalsResponse {
	arrivals: SingleArrival[]
}