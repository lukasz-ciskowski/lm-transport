import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { ArrivalByBusStop } from "../models/Arrival"

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
}

export const ArrivalRepository = new Repository()
