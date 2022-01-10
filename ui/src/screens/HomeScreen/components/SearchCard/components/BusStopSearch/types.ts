export interface BusStopSearchForm {
	busStopId: number
	date: Date
	time: Date
}

export interface ArrivalsResponse {
	arrivals: SingleArrival[]
}

interface SingleArrival {
	id: number
	first_stop: string
	last_stop: string
	route_run: {
		id: number
		bus_line: {
			id: number
			line_number: number
		}
		decorator?: {
			name: string
			prefix: string
		}
	}
	arrival_time: string
}
