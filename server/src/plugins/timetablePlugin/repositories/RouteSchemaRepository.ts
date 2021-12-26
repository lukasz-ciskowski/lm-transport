import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { DirectionKeys, RouteSchemasQuery } from "../models/RouteSchema"

class Repository extends BaseRepository {
	public async getRouteSchemas(params: {
		busLine: number
		direction?: DirectionKeys
	}): Promise<{ schemas: Array<RouteSchemasQuery> }> {
		let query = `
            SELECT
            RS.Id, RS.FlowOrder,
            BS.Id as 'BusStop.Id', BS.Name as 'BusStop.Name',
            FROM RouteSchemas as RS
            LEFT JOIN BusStops BS ON BS.Id = RS.BusStopId
        `

		if (params.busLine) {
			query += ` WHERE R.BusLineId=@BusLineId`
		}
		if (params.direction !== undefined) {
			query += ` WHERE RS.Direction=@Direction`
		}
		query += ` ORDER BY FlowOrder`

		const result = await this.db
			.request()
			.input("BusLineId", params.busLine)
			.input("Direction", params.direction)
			.query(query)

		return { schemas: result.recordset.map(parseDbToObject) }
	}
}

export const RouteSchemaRepository = new Repository()
