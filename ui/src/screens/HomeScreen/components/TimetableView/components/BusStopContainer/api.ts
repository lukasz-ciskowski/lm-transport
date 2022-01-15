import { SingleBusStopResult } from "./types"

export const getSingleBusStop = (busStopId: number) => async (): Promise<SingleBusStopResult> => {
	return {
		bus_stop: {
			id: 3,
			name: "Galeria Bałtycka",
			street: "",
			post_code: "",
			city: "",
			lon: 0,
			lat: 0,
		},
	}
	// const result = await axios.get(`/api/timetable/bus-stops/${busStopId}`)
	// return result.data
}
