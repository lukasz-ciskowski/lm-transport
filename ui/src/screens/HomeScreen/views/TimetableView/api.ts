import axios from "axios"
import { RouteSchemasResponse } from "./types"

export const getSchema = (busLine: number) => async (): Promise<RouteSchemasResponse> => {
	const result = await axios.get("/api/timetable/route-schemas", {
		params: { bus_line: busLine },
	})
	return result.data
}
