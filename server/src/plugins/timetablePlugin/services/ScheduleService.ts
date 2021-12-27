import { notFound } from "@hapi/boom"
import { CacheService } from "../../../services/CacheService"
import { Schedule } from "../models/Schedule"
import { ScheduleRepository } from "../repositories/ScheduleRepository"

class Service {
	private readonly _cacheService: CacheService
	constructor() {
		this._cacheService = new CacheService(60 * 60 * 1 * 24)
	}

	async getScheduleByDay(date: Date) {
		const weekdayNumber = date.getDay() + 1
		const allSchedules = await this._cacheService.get<Schedule[]>("days", async () => {
			const result = await ScheduleRepository.getAll()
			return result.schedules
		})

		const schedule = allSchedules.find(
			(schedule) =>
				schedule.WeekNumFrom <= weekdayNumber && schedule.WeekNumTo >= weekdayNumber
		)
		if (!schedule) throw notFound("Schedule not fount")
		return schedule
	}
}

export const ScheduleService = new Service()
