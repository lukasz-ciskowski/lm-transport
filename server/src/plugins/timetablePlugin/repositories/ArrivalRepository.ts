import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { ArrivalByBusStop, ArrivalByRouteRun } from "../models/Arrival"
import { DirectionKeys } from "../models/RouteSchema"

class Repository extends BaseRepository {
	public async getByBusStop(
		busStopId: number,
		scheduleId: number,
		direction?: DirectionKeys,
		from?: string
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		const endpointQuery = `
			SELECT TOP 1
			BS.Id, BS.Name
			FROM RouteSchemas
			LEFT JOIN BusStops BS ON BusStopId=BS.Id
			WHERE Direction=RS.Direction AND BusLineId=BL.Id
		`


		let query = `
			SELECT
            A.Id, A.ArrivalTime, A.RouteRunId AS 'RouteRun.Id',
			RS.FlowOrder as 'RouteSchema.FlowOrder', RS.Direction as 'RouteSchema.Direction',
            BL.Id AS 'RouteRun.BusLine.Id', BL.Name AS 'RouteRun.BusLine.Name',
			'FromEndpoint' = @FromEndpointQuery, 'ToEndpoint' = @ToEndpointQuery
            FROM Arrivals AS A
			LEFT JOIN RouteSchemas RS ON RS.Id=RouteSchemaId
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
            LEFT JOIN BusLines BL ON BL.Id = R.BusLineId
            WHERE RR.ScheduleId=@ScheduleId AND RS.BusStopId=@BusStopId
		`

		if (direction) {
			query += ` AND RS.Direction=@Direction`
		}
		if (from) {
			query += ` AND A.ArrivalTime >= @ArrivalTime`
		}

		query += ` ORDER BY A.ArrivalTime`

		const result = await this.db
			.request()
			.input("ScheduleId", scheduleId)
			.input("BusStopId", busStopId)
			.input("Direction", direction)
			.input("ArrivalTime", from)
			.input("FromEndpointQuery", endpointQuery + ` ORDER BY FlowOrder ASC`)
			.input("ToEndpointQuery", endpointQuery + ` ORDER BY FlowOrder DESC`)
			.query(query)

		return { arrivals: result.recordset.map(parseDbToObject) }
	}

	public async getByRouteRun(routeRunId: number): Promise<{ arrivals: ArrivalByRouteRun[] }> {
		const result = await this.db.query`
            SELECT
            A.Id, A.ArrivalTime,
			BS.Id AS 'RouteSchema.BusStop.Id', Bs.Name AS 'RouteSchema.BusStop.Name', BS.Street AS 'RouteSchema.BusStop.Street',
			BS.City AS 'RouteSchema.BusStop.City', BS.PostCode as 'RouteSchema.BusStop.PostCode', BS.Lat as 'RouteSchema.BusStop.Lat', BS.Lon as 'RouteSchema.BusStop.Lon',
			RR.Id AS 'RouteRun.Id', RD.Id as 'RouteRun.RunDecoration.Id', RD.Name as 'RouteRun.RunDecoration.Name'
            FROM Arrivals AS A
			LEFT JOIN RouteSchemas RS ON RS.Id=RouteSchemaId
			LEFT JOIN BusStops BS ON RS.BusStopId=BS.Id
			LEFT JOIN RouteRuns RR ON A.RouteRunId=RR.Id
			LEFT JOIN RunDecorations RD ON RR.RunDecorationId = RD.Id
			WHERE A.RouteRunId=${routeRunId}
            ORDER BY A.ArrivalTime
        `

		return { arrivals: result.recordset.map(parseDbToObject) }
	}
}

export const ArrivalRepository = new Repository()
