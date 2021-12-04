import { DbService } from "../../services/DbService"

export class BaseRepository {
	protected get db() {
		if (!DbService.instance.db) throw new Error("No database connection")
		return DbService.instance.db
	}
}
