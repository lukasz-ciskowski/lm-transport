import { BaseRepository } from "../../helpers/BaseRepository"
import { BusStop } from "../models/BusStop"

class Repository extends BaseRepository {
	public async getAll(): Promise<{ busStops: Array<BusStop> }> {
		const result = await this.db.query`
            SELECT * FROM BusStops
        `

		return { busStops: result.recordset }
	}

	public async getById(id: number): Promise<{ busStop: BusStop }> {
		const result = await this.db.query`
            SELECT * FROM BusStops
			WHERE Id=${id}
        `

		return { busStop: result.recordset[0] }
	}
}

export const BusStopRepository = new Repository()
