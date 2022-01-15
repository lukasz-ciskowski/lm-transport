import axios from "axios"
import { RouteRunResponse } from "./types"

export const getRouteRun = (runId: number) => async (): Promise<RouteRunResponse> => {
	return {
		run: {
			id: 1,
		},
		arrivals: [
			{
				id: 1,
				bus_stop: {
					id: 1,
					name: "Wrzeszcz PKP",
				},
				arrival_time: "7:00",
			},
            {
				id: 2,
				bus_stop: {
					id: 2,
					name: "Galeria bałtycka",
				},
				arrival_time: "7:10",
			},
            {
				id: 3,
				bus_stop: {
					id: 3,
					name: "Galeria bałtycka 2",
				},
				arrival_time: "7:20",
			},
            {
				id: 4,
				bus_stop: {
					id: 4,
					name: "Zaspa PKP",
				},
				arrival_time: "7:30",
			},
		],
	}
	// const response = await axios.get(`/api/timetable/route-runs/${runId}`)
	// return response.data
}
