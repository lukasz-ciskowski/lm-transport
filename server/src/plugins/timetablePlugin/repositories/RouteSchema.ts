import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { RouteSchemasQuery } from "../models/RouteSchema"

class Repository extends BaseRepository {
	public async getRouteSchemas(params: {
		busLine?: number
		routeId?: number
	}): Promise<{ schemas: Array<RouteSchemasQuery> }> {
		let query = `
            SELECT
            RS.Id, RS.FlowOrder,
            R.Id as 'Route.Id',
            BS.Id as 'BusStop.Id', BS.Name as 'BusStop.Name',
            BSS.Id as 'Route.StartBusStop.Id', BSS.Name as 'Route.StartBusStop.Name',
            BSE.Id as 'Route.EndBusStop.Id', BSE.Name as 'Route.EndBusStop.Name'
            FROM RouteSchemas as RS
            LEFT JOIN Routes R ON R.Id = RS.RouteId
            LEFT JOIN BusStops BSS ON BSS.Id = R.StartBusStopId
            LEFT JOIN BusStops BSE ON BSE.Id = R.EndBusStopId
            LEFT JOIN BusStops BS ON BS.Id = RS.BusStopId
        `
		
		if (params.busLine) {
			query += ` WHERE R.BusLineId=@Param`
		} else if (params.routeId) {
			query += ` WHERE RS.RouteId=@Param`
		}
		query += ` ORDER BY FlowOrder`
		
		const result = await this.db
			.request()
			.input("Param", params.busLine ?? params.routeId)
			.query(query)

		return { schemas: result.recordset.map(parseDbToObject) }
	}
}

export const RouteSchemaRepository = new Repository()
