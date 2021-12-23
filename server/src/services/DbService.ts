import sql from "mssql"
import ConfigService from "./ConfigService"

export class DbService {
	private static _instance: DbService
	constructor(public readonly db: sql.ConnectionPool | undefined) {}

	public static async connect() {
		const dbResult = await new sql.ConnectionPool(ConfigService.config.db).connect()
        
		this._instance = new DbService(dbResult)
		return this._instance
	}

    public async close() {
        return this.db?.close()
    }

    public static get instance() {
		return this._instance
	}
}
