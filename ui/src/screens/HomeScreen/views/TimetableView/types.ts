import { Directions } from "common/Directions"
import { BusStop } from "models/busStop";

export interface RouteSchemasResponse {
	routes: [
		[Directions.Forward, Array<Pick<BusStop, "id" | "name">>],
		[Directions.Backwards, Array<Pick<BusStop, "id" | "name">>]
	]
}

export interface TimetableBaseProps {
	initializing: boolean
	schemas: RouteSchemasResponse | undefined
}
