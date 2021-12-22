import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { ArrivalByBusStop, ArrivalByRouteRun } from "../models/Arrival"

class Repository extends BaseRepository {
	public async getByBusStop(
		busStopId: number,
		scheduleId: number,
		routeId?: number,
		from?: string
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		let query = `
			SELECT
            A.Id, A.ArrivalTime, A.RouteRunId AS 'RouteRun.Id',
			RS.FlowOrder as 'RouteSchema.FlowOrder',
			BSS.Id AS 'RouteRun.Route.StartBusStop.Id', BSS.Name AS 'RouteRun.Route.StartBusStop.Name',
            BSE.Id AS 'RouteRun.Route.EndBusStop.Id', BSE.Name AS 'RouteRun.Route.EndBusStop.Name',
            R.Id AS 'RouteRun.Route.Id', BL.Id AS 'RouteRun.BusLine.Id', BL.Name AS 'RouteRun.BusLine.Name'
            FROM Arrivals AS A
			LEFT JOIN RouteSchemas RS ON RS.Id=RouteSchemaId
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
			LEFT JOIN Routes R ON R.Id = RS.RouteId
            LEFT JOIN BusStops BSS ON BSS.Id = R.StartBusStopId
            LEFT JOIN BusStops BSE ON BSE.Id = R.EndBusStopId
            LEFT JOIN BusLines BL ON BL.Id = R.BusLineId
            WHERE RR.ScheduleId=@ScheduleId AND RS.BusStopId=@BusStopId
		`

		if (routeId) {
			query += ` AND RS.RouteId=@RouteId`
		}
		if (from) {
			query += ` AND A.ArrivalTime >= @ArrivalTime`
		}

		query += ` ORDER BY A.ArrivalTime`

		const result = await this.db
			.request()
			.input("ScheduleId", scheduleId)
			.input("BusStopId", busStopId)
			.input("RouteId", routeId)
			.input("ArrivalTime", from)
			.query(query)

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
