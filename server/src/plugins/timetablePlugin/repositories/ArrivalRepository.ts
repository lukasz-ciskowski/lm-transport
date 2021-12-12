import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { Arrival, ArrivalByBusStop } from "../models/Arrival"

class Repository extends BaseRepository {
	// public async getDistinctByBusLine(
	// 	busLineId: number,
	// 	scheduleId: number
	// ): Promise<{ runs: Array<Arrival> }> {
	// 	const result = await this.db.query`
	//         SELECT
	//         R.Id as 'Route.Id',
	//         BS.Id as 'Route.BusStop.Id', BS.Name as 'Route.BusStop.Name',
	//         BSS.Id as 'Route.StartBusStop.Id', BSS.Name as 'Route.StartBusStop.Name',
	//         BSE.Id as 'Route.EndBusStop.Id', BSE.Name as 'Route.EndBusStop.Name',
	//         BL.Id as 'BusLine.Id', BL.LineNumber as 'BusLine.LineNumber'
	//         FROM Arrivals AS A
	//         LEFT JOIN RouteRuns RR ON RR.Id=A.RouteRunId
	//         LEFT JOIN Routes R ON R.Id = RR.RouteId
	//         LEFT JOIN BusStops BSS ON BSS.Id = R.StartBusStopId
	//         LEFT JOIN BusStops BSE ON BSE.Id = R.EndBusStopId
	//         LEFT JOIN BusStops BS ON BS.Id = A.BusStopId
	//         LEFT JOIN BusLines BL ON BL.Id = R.BusLineId
	//         WHERE
	//         RR.Id IN (
	//             SELECT TOP 2 RouteRuns.Id
	//             FROM RouteRuns
	//             LEFT JOIN Routes R ON R.Id=RouteId
	//             WHERE ScheduleId=${scheduleId}
	//             AND R.StartBusStopId IN (
	//                 SELECT TOP 2 Routes.StartBusStopId
	//                 FROM Routes
	//                 LEFT JOIN BusStops BSS ON BSS.Id=StartBusStopId
	//                 LEFT JOIN BusStops BSE ON BSE.Id=EndBusStopId
	//                 WHERE BusLineId=${busLineId}))
	//         ORDER BY A.ArrivalTime
	//     `

	// 	return { runs: result.recordset }
	// }

	public async getByBusStop(
		busStopId: number,
		scheduleId: number
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		const result = await this.db.query`
            SELECT
            A.Id, A.ArrivalTime, A.RouteRunId as 'RouteRun.Id'
            FROM Arrivals AS A
            WHERE RR.ScheduleId=${scheduleId} AND RS.BusStopId=${busStopId}
            ORDER BY A.ArrivalTime
        `

		return { arrivals: result.recordset.map(parseDbToObject) }
	}
}

export const ArrivalRepository = new Repository()
