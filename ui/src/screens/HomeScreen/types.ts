export interface BusStopsResponse {
	bus_stops: BusStop[]
}

export interface BusStop {
	id: number
	name: string
	street: string
	city: string
	post_code: string
	lat: number
	lon: number
}
