import { Directions } from "common/Directions"
import { BusStop } from "screens/HomeScreen/types"

export interface RouteSchemasResponse {
	routes: [
		[Directions.Forward, Array<Pick<BusStop, "id" | "name">>],
		[Directions.Backwards, Array<Pick<BusStop, "id" | "name">>]
	]
}
