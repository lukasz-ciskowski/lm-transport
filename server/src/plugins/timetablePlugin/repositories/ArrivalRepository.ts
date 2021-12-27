import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import {
	ArrivalByBusStop,
	ArrivalByRouteRun,
	AvailableBusStop,
} from "../models/Arrival"
import { DirectionKeys } from "../models/RouteSchema"

class Repository extends BaseRepository {
	public async getByBusStop(
		busStopId: number,
		scheduleId: number,
		timeFrom: string
	): Promise<{ arrivals: ArrivalByBusStop[] }> {
		const query = `
			SELECT
            A.Id, A.ArrivalTime,
			RR.Id AS 'RouteRun.Id', RR.Direction AS 'RouteRun.Direction',
			BL.Id AS 'RouteRun.BusLine.Id', BL.LineNumber AS 'RouteRun.BusLine.LineNumber',
			RD.Id AS 'RouteRun.RunDecoration.Id', RD.Name AS 'RouteRun.RunDecoration.Name', RD.Prefix AS 'RouteRun.RunDecoration.Prefix',
			F.StartBusStop, F.EndBusStop
            FROM Arrivals AS A
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
			LEFT JOIN BusLines BL ON BL.Id=BusLineId
			LEFT JOIN RunDecorations RD ON RD.Id=RunDecorationId
			LEFT JOIN (
				SELECT 
				V.BusLineId, V.Direction,
				MIN(CASE WHEN seqnum_asc = 1 THEN V.Name END) AS StartBusStop,
				MIN(CASE WHEN seqnum_desc = 1 THEN V.Name END) AS EndBusStop
				FROM (SELECT BS.Name, RR.Direction, RR.BusLineId,
							row_number() OVER (partition by RR.BusLineId, RR.Direction order by A.ArrivalTime asc) as seqnum_asc,
							row_number() over (partition by RR.BusLineId, RR.Direction order by A.ArrivalTime desc) as seqnum_desc
					  from Arrivals A
					  LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
					  LEFT JOIN BusStops BS on BS.Id=BusStopId
					 ) V
				WHERE seqnum_asc = 1 OR seqnum_desc = 1
				GROUP BY V.BusLineId, V.Direction
			) F ON F.Direction=RR.Direction AND F.BusLineId=RR.BusLineId
            WHERE RR.ScheduleId=@ScheduleId AND A.BusStopId=@BusStopId AND A.ArrivalTime>=@ArrivalTime
			ORDER BY A.ArrivalTime
		`

		const result = await this.db
			.request()
			.input("ScheduleId", scheduleId)
			.input("BusStopId", busStopId)
			.input("ArrivalTime", timeFrom)
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
			F.StartBusStop, F.EndBusStop
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
				MIN(CASE WHEN seqnum_asc = 1 THEN V.Name END) AS StartBusStop,
				MIN(CASE WHEN seqnum_desc = 1 THEN V.Name END) AS EndBusStop
				FROM (SELECT BS.Name, RR.Direction, RR.BusLineId,
							row_number() OVER (partition by RR.BusLineId, RR.Direction order by A.ArrivalTime asc) as seqnum_asc,
							row_number() over (partition by RR.BusLineId, RR.Direction order by A.ArrivalTime desc) as seqnum_desc
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
			BS.Id AS 'RouteSchema.BusStop.Id', Bs.Name AS 'RouteSchema.BusStop.Name', BS.Street AS 'RouteSchema.BusStop.Street',
			BS.City AS 'RouteSchema.BusStop.City', BS.PostCode as 'RouteSchema.BusStop.PostCode', BS.Lat as 'RouteSchema.BusStop.Lat', BS.Lon as 'RouteSchema.BusStop.Lon',
			RR.Id AS 'RouteRun.Id'
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

	public async getAllAvailableStops(
		busLineId: number,
		direction: DirectionKeys
	): Promise<{ stops: AvailableBusStop[] }> {
		const result = await this.db.query`
			SELECT
			BS.Id AS 'BusStop.Id', Bs.Name AS 'BusStop.Name', MIN(ArrivalTime)
			FROM Arrivals AS A
			LEFT JOIN RouteRuns RR ON RouteRunId=RR.Id
			WHERE RR.BusLineId=${busLineId} AND RR.Direction=${direction}
			GROUP BY 'BusStop.Id', 'BusStop.Name'
			ORDER BY A.ArrivalTime
		`

		return { stops: result.recordset.map(parseDbToObject) }
	}
}

export const ArrivalRepository = new Repository()
