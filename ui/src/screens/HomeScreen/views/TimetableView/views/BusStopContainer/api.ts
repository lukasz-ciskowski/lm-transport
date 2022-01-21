import axios from "axios"
import { SingleBusStopResult } from "./types"

export const getSingleBusStop = (busStopId: number) => async (): Promise<SingleBusStopResult> => {
	const result = await axios.get(`/api/timetable/bus-stops/${busStopId}`)
	return result.data
}
