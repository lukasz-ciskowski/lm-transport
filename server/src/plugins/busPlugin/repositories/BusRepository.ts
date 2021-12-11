import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { Bus } from "../models/Bus"

class Repository extends BaseRepository {
	public async getById(id: number): Promise<{ bus: Bus | null }> {
		const result = await this.db.query`
            SELECT 
            B.*, 
            BL.Id as 'BusLine.Id', BL.LineNumber as 'BusLine.LineNumber',
            D.Id as 'AssignedDriver.Id', D.FirstName as 'AssignedDriver.FirstName', D.LastName as 'AssignedDriver.LastName'
            FROM Buses as B
            LEFT JOIN BusLines BL ON BL.Id = B.BusLineId 
            LEFT JOIN Drivers D ON D.Id = B.AssignedDriverId 
			WHERE B.Id=${id}
        `

		return { bus: parseDbToObject(result.recordset[0]) }
	}
}

export const BusRepository = new Repository()
