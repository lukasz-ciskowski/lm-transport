import { BaseRepository } from "../../helpers/BaseRepository"
import { BusLine } from "../models/BusLine"

class Repository extends BaseRepository {
	public async getAll(): Promise<{ busLines: Array<BusLine> }> {
		const result = await this.db.query`
            SELECT * FROM BusLines
        `

		return { busLines: result.recordset }
	}

	public async getById(id: number): Promise<{ busLine: BusLine | null }> {
		const result = await this.db.query`
            SELECT * FROM BusLines
			WHERE Id=${id}
        `

		return { busLine: result.recordset[0] }
	}
}

export const BusLineRepository = new Repository()
