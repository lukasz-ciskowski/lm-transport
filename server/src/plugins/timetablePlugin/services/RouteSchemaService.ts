import { BusStop } from "../models/BusStop"
import { DirectionKeys, RouteSchemasQuery } from "../models/RouteSchema"
import { RouteSchemaRepository } from "../repositories/RouteSchemaRepository"

export type SchemaDirection = {
	schemas: RouteSchemasQuery[]
	direction: DirectionKeys
	endpoints: Endpoints
}
type Endpoints = {
	start: Pick<BusStop, "Id" | "Name">
	end: Pick<BusStop, "Id" | "Name">
}
class Service {
	async getRouteSchemas(query: { busLine: number; direction?: DirectionKeys }) {
		const result = await RouteSchemaRepository.getRouteSchemas(query)

		if (query.direction !== undefined) {
			return [this.findEndpoints(result.schemas, query.direction)]
		}

		return [
			this.findEndpoints(result.schemas, DirectionKeys.Forwards),
			this.findEndpoints(result.schemas, DirectionKeys.Backwards),
		]
	}

	private findEndpoints(
		schemas: RouteSchemasQuery[],
		direction: DirectionKeys
	): SchemaDirection {
		const availableSchemas = schemas.filter(s => s.Direction === direction)

		return {
			schemas: availableSchemas,
			direction: direction,
			endpoints: {
				start: availableSchemas[0].BusStop,
				end: availableSchemas[availableSchemas.length - 1].BusStop,
			},
		}
	}
}

export const RouteSchemaService = new Service()
