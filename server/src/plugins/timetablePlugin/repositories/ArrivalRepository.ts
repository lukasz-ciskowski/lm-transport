import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { ArrivalByBusStop, ArrivalByRouteRun, AvailableBusStop } from "../models/Arrival"
import { DirectionKeys } from "../models/RouteRun"

class Repository extends BaseRepository {
	public async getByBusStop(
		busStopId: number,
		scheduleId: number,
		timeFrom: string,
		direction?: DirectionKeys
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		let query = `
			SELECT
            A.Id, A.ArrivalTime,
			RR.Id AS 'RouteRun.Id', RR.Direction AS 'RouteRun.Direction',
			BL.Id AS 'RouteRun.BusLine.Id', BL.LineNumber AS 'RouteRun.BusLine.LineNumber',
			RD.Id AS 'RouteRun.RunDecoration.Id', RD.Name AS 'RouteRun.RunDecoration.Name', RD.Prefix AS 'RouteRun.RunDecoration.Prefix',
			F.FirstBusStop, F.LastBusStop
            FROM Arrivals AS A
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
			LEFT JOIN BusLines BL ON BL.Id=BusLineId
			LEFT JOIN RunDecorations RD ON RD.Id=RunDecorationId
			LEFT JOIN (
				SELECT 
				V.BusLineId, V.Direction,
				MIN(CASE WHEN seqnum_asc = 1 THEN V.Name END) AS FirstBusStop,
				MIN(CASE WHEN seqnum_desc = 1 THEN V.Name END) AS LastBusStop
				FROM (SELECT BS.Name, RR.Direction, RR.BusLineId,
							row_number() OVER (partition by RR.Id order by A.ArrivalTime asc) as seqnum_asc,
							row_number() over (partition by RR.Id order by A.ArrivalTime desc) as seqnum_desc
					  from Arrivals A
					  LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
					  LEFT JOIN BusStops BS on BS.Id=BusStopId
					 ) V
				WHERE seqnum_asc = 1 OR seqnum_desc = 1
				GROUP BY V.BusLineId, V.Direction
			) F ON F.Direction=RR.Direction AND F.BusLineId=RR.BusLineId
            WHERE RR.ScheduleId=@ScheduleId AND A.BusStopId=@BusStopId AND A.ArrivalTime>=@ArrivalTime
		`

		if (direction !== undefined) {
			query += " AND RR.Direction=@Direction"
		}

		query += " ORDER BY A.ArrivalTime"

		const result = await this.db
			.request()
			.input("ScheduleId", scheduleId)
			.input("BusStopId", busStopId)
			.input("ArrivalTime", timeFrom)
			.input("Direction", direction)
			.query(query)

		return { arrivals: result.recordset.map(parseDbToObject) }
	}

	public async getByConnection(
		fromBusStopId: number,
		toBusStopId: number,
		scheduleId: number,
		timeFrom: string
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		const query = `
			SELECT
            A.Id, A.ArrivalTime,
			RR.Id AS 'RouteRun.Id', RR.Direction AS 'RouteRun.Direction',
			BL.Id AS 'RouteRun.BusLine.Id', BL.LineNumber AS 'RouteRun.BusLine.LineNumber',
			RD.Id AS 'RouteRun.RunDecoration.Id', RD.Name AS 'RouteRun.RunDecoration.Name', RD.Prefix AS 'RouteRun.RunDecoration.Prefix',
			F.FirstBusStop, F.LastBusStop
            FROM Arrivals AS A
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
			LEFT JOIN BusLines BL ON BL.Id=BusLineId
			LEFT JOIN RunDecorations RD ON RD.Id=RunDecorationId
			LEFT JOIN (
				SELECT A.ArrivalTime, RR.Id, RR.Direction FROM Arrivals A
				LEFT JOIN BusStops BS on BS.Id=BusStopId 
				LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
				WHERE A.BusStopId=@ToBusStopId
			) T on T.Id=RR.Id
			LEFT JOIN (
				SELECT 
				V.BusLineId, V.Direction,
				MIN(CASE WHEN seqnum_asc = 1 THEN V.Name END) AS FirstBusStop,
				MIN(CASE WHEN seqnum_desc = 1 THEN V.Name END) AS LastBusStop
				FROM (SELECT BS.Name, RR.Direction, RR.BusLineId,
							row_number() OVER (partition by RR.Id order by A.ArrivalTime asc) as seqnum_asc,
							row_number() over (partition by RR.Id order by A.ArrivalTime desc) as seqnum_desc
					  from Arrivals A
					  LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
					  LEFT JOIN BusStops BS on BS.Id=BusStopId
					 ) V
				WHERE seqnum_asc = 1 OR seqnum_desc = 1
				GROUP BY V.BusLineId, V.Direction
			) F ON F.Direction=RR.Direction AND F.BusLineId=RR.BusLineId
            WHERE RR.ScheduleId=@ScheduleId AND A.ArrivalTime>=@ArrivalTime 
			AND A.BusStopId=@FromBusStopId and T.ArrivalTime>A.ArrivalTime
			ORDER BY A.ArrivalTime
		`

		const result = await this.db
			.request()
			.input("ScheduleId", scheduleId)
			.input("FromBusStopId", fromBusStopId)
			.input("ToBusStopId", toBusStopId)
			.input("ArrivalTime", timeFrom)
			.query(query)

		return { arrivals: result.recordset.map(parseDbToObject) }
	}

	public async getByRouteRun(routeRunId: number): Promise<{ arrivals: ArrivalByRouteRun[] }> {
		const result = await this.db.query`
            SELECT
            A.Id, A.ArrivalTime,
			BS.Id AS 'BusStop.Id', Bs.Name AS 'BusStop.Name'
            FROM Arrivals AS A
			LEFT JOIN BusStops BS ON A.BusStopId=BS.Id
			WHERE A.RouteRunId=${routeRunId}
            ORDER BY A.ArrivalTime
        `

		return { arrivals: result.recordset.map(parseDbToObject) }
	}

	public async getAllAvailableStops(busLineId: number): Promise<{ stops: AvailableBusStop[] }> {
		let query = `
			SELECT T.BusStopId AS 'BusStop.Id', T.BusStopName AS 'BusStop.Name', T.Direction
			FROM(
				SELECT
				BS.Id AS 'BusStopId', Bs.Name AS 'BusStopName', RR.Direction, RR.BusLineId, A.ArrivalTime,
					row_number() over (partition by RR.BusLineId, RR.Direction, BS.Id order by A.ArrivalTime asc) as seqnum_asc
				FROM Arrivals AS A
				LEFT JOIN RouteRuns RR ON RouteRunId=RR.Id
				LEFT JOIN BusStops BS ON BS.Id=A.BusStopId
				order by A.ArrivalTime OFFSET 0 ROWS
			) T
			WHERE T.BusLineId=@BusLine AND T.seqnum_asc=1
			ORDER BY T.Direction, T.ArrivalTime
		`

		const result = await this.db
			.request()
			.input("BusLine", busLineId)
			.query(query)

		return { stops: result.recordset.map(parseDbToObject) }
	}

	public async getLongestRunInMinutes(busLineId: number): Promise<{ minutes: number }> {
		const result = await this.db.query`
			SELECT TOP 1
			DATEDIFF(MINUTE, MIN(case when v.seqnum_asc = 1 then v.ArrivalTime end), MIN(case when seqnum_desc = 1 then v.ArrivalTime end)) as 'Minutes'
			FROM 
				(SELECT
					RR.Id, A.ArrivalTime,
					row_number() OVER (PARTITION BY RR.Id ORDER BY A.ArrivalTime ASC) AS seqnum_asc,
					row_number() OVER (PARTITION BY RR.Id ORDER BY A.ArrivalTime DESC) AS seqnum_desc
				FROM Arrivals A
				LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
				WHERE RR.BusLineId=${busLineId}
				) v
			WHERE seqnum_asc = 1 OR seqnum_desc = 1
			GROUP BY v.Id
			ORDER BY Minutes DESC
		`

		return { minutes: result.recordset[0].Minutes }
	}
}

export const ArrivalRepository = new Repository()
