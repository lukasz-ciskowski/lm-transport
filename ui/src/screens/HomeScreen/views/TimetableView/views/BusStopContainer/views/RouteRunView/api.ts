import axios from "axios"
import { RouteRunResponse } from "./types"

export const getRouteRun = (runId: number) => async (): Promise<RouteRunResponse> => {
	const response = await axios.get(`/api/timetable/route-runs/${runId}`)
	return response.data
}
