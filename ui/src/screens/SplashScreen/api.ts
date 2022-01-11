import axios from "axios"
import { BusLinesResult } from "./types"

export const refresh = () => axios.post("/api/refresh")

export async function getBusLines(): Promise<BusLinesResult> {
    return {
        bus_lines: [{id: 1, line_number: 127}]
    }
	// const result = await axios.get("/api/bus-lines")
	// return result.data
}
