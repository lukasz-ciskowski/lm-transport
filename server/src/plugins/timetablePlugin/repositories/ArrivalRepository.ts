import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { ArrivalByBusStop, ArrivalByRouteRun } from "../models/Arrival"

class Repository extends BaseRepository {
	public async getByBusStop(
		busStopId: number,
		routeId: number,
		scheduleId: number
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		const result = await this.db.query`
            SELECT
            A.Id, A.ArrivalTime, A.RouteRunId as 'RouteRun.Id'
            FROM Arrivals AS A
			LEFT JOIN RouteSchemas RS ON RS.Id=RouteSchemaId
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
            WHERE RR.ScheduleId=${scheduleId} AND RS.BusStopId=${busStopId} AND RS.RouteId=${routeId}
            ORDER BY A.ArrivalTime
        `

		return { arrivals: result.recordset.map(parseDbToObject) }
	}

	public async getByRouteRun(routeRunId: number): Promise<{ arrivals: ArrivalByRouteRun[] }> {
		const result = await this.db.query`
            SELECT
            A.Id, A.ArrivalTime,
			BS.Id AS 'RouteSchema.BusStop.Id', Bs.Name AS 'RouteSchema.BusStop.Name', BS.Street AS 'RouteSchema.BusStop.Street',
			BS.City AS 'RouteSchema.BusStop.City', BS.PostCode as 'RouteSchema.BusStop.PostCode', BS.Lat as 'RouteSchema.BusStop.Lat', BS.Lon as 'RouteSchema.BusStop.Lon'
            FROM Arrivals AS A
			LEFT JOIN RouteSchemas RS ON RS.Id=RouteSchemaId
			LEFT JOIN BusStops BS ON RS.BusStopId=BS.Id
			WHERE A.RouteRunId=${routeRunId}
            ORDER BY A.ArrivalTime
        `

		return { arrivals: result.recordset.map(parseDbToObject) }
	}
}

export const ArrivalRepository = new Repository()
