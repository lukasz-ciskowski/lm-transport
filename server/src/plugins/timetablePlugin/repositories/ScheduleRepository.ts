import { BaseRepository } from "../../helpers/BaseRepository"
import { Schedule } from "../models/Schedule"

class Repository extends BaseRepository {
	public async getAll(): Promise<{ schedules: Array<Schedule> }> {
		const result = await this.db.query`
            SELECT * FROM Schedules
        `

		return { schedules: result.recordset }
	}
}

export const ScheduleRepository = new Repository()
