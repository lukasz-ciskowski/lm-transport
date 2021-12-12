import { RouteSchemaRepository } from "../repositories/RouteSchema"

class Service {
	async getRouteSchemas(query: { busLineId?: number, routeId?: number}) {
		const result = await RouteSchemaRepository.getRouteSchemas(query)
		return result.schemas
	}
}

export const RouteSchemaService = new Service()
