import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { RouteRunDecoration } from "../models/RouteRun"

class Repository extends BaseRepository {
	public async getRouteRunWithDecoration(id: number): Promise<{ run: RouteRunDecoration }> {
		const result = await this.db.query`
            SELECT
			RR.Id AS 'Id', RD.Id as 'RunDecoration.Id', RD.Name as 'RunDecoration.Name', RD.Prefix as 'RunDecoration.Prefix'
            FROM RouteRuns AS RR
			LEFT JOIN RunDecorations RD ON RR.RunDecorationId = RD.Id
			WHERE RR.Id=${id}
        `

		return { run: parseDbToObject(result.recordset[0]) }
	}
}

export const RouteRunRepository = new Repository()
