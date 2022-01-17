import axios from "axios"
import { Directions } from "common/Directions"
import { RouteSchemasResponse } from "./types"

export const getSchema = (busLine: number) => async (): Promise<RouteSchemasResponse> => {
	return {
		routes: [
			[
				Directions.Forward,
				[
					{ id: 1, name: "Wrzeszcz PKP" },
					{ id: 2, name: "Galeria Bałtycka" },
					{ id: 3, name: "Galeria Bałtycka 2" },
					{ id: 4, name: "Zaspa PKP" },
				],
			],
			[
				Directions.Backwards,
				[
					{ id: 4, name: "Zaspa PKP" },
					{ id: 3, name: "Galeria Bałtycka 2" },
					{ id: 2, name: "Galeria Bałtycka" },
					{ id: 1, name: "Wrzeszcz PKP" },
				],
			],
		],
	} as RouteSchemasResponse
	// const result = await axios.get("/api/timetable/route-schemas", {
	// 	params: { bus_line: busLine },
	// })
	// return result.data
}
