export interface RouteRunResponse {
    run: RunDetails
    arrivals: Array<RunArrival>
}

export interface RunDetails {
	id: number
	decorator?: {
		name: string
		prefix: string
	}
}

export interface RunArrival {
	id: number
	bus_stop: {
		id: number
		name: string
	}
	arrival_time: string
}
